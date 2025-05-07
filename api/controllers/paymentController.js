const PaymentMethod = require('../models/PaymentMethod');
const Order = require('../models/Order');

// Get user payment methods
const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ user: req.user.id });
    
    // Mask sensitive data
    const maskedMethods = paymentMethods.map(method => {
      const methodObj = method.toObject();
      
      if (methodObj.type === 'credit_card' && methodObj.details.cardNumber) {
        // Only return last 4 digits
        methodObj.details.cardNumber = methodObj.details.cardNumber.slice(-4).padStart(16, '*');
      }
      
      return methodObj;
    });
    
    res.json(maskedMethods);
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add payment method
const addPaymentMethod = async (req, res) => {
  try {
    const { type, details, isDefault } = req.body;
    
    // Validate required fields based on payment type
    if (type === 'credit_card') {
      if (!details.cardNumber || !details.cardHolder || !details.expiryDate) {
        return res.status(400).json({ message: 'Card details are required' });
      }
      
      // Only store last 4 digits for security
      details.cardNumber = details.cardNumber.slice(-4);
    } else if (type === 'paypal') {
      if (!details.email) {
        return res.status(400).json({ message: 'Email is required for PayPal' });
      }
    }
    
    // Create new payment method
    const newMethod = new PaymentMethod({
      user: req.user.id,
      type,
      details,
      isDefault
    });
    
    // If this is set as default, update other methods
    if (isDefault) {
      await PaymentMethod.updateMany(
        { user: req.user.id },
        { $set: { isDefault: false } }
      );
    }
    
    await newMethod.save();
    
    res.status(201).json(newMethod);
  } catch (error) {
    console.error('Add payment method error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update payment method
const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { details, isDefault } = req.body;
    
    // Find payment method
    const method = await PaymentMethod.findOne({
      _id: id,
      user: req.user.id
    });
    
    if (!method) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    
    // Update details if provided
    if (details) {
      if (method.type === 'credit_card') {
        if (details.cardNumber) {
          // Only store last 4 digits for security
          details.cardNumber = details.cardNumber.slice(-4);
        }
        
        method.details.cardHolder = details.cardHolder || method.details.cardHolder;
        method.details.expiryDate = details.expiryDate || method.details.expiryDate;
        method.details.cardNumber = details.cardNumber || method.details.cardNumber;
      } else if (method.type === 'paypal') {
        method.details.email = details.email || method.details.email;
      }
    }
    
    // Update default status if provided
    if (isDefault !== undefined) {
      method.isDefault = isDefault;
      
      // If setting as default, update other methods
      if (isDefault) {
        await PaymentMethod.updateMany(
          { user: req.user.id, _id: { $ne: id } },
          { $set: { isDefault: false } }
        );
      }
    }
    
    await method.save();
    
    res.json(method);
  } catch (error) {
    console.error('Update payment method error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete payment method
const deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find payment method
    const method = await PaymentMethod.findOne({
      _id: id,
      user: req.user.id
    });
    
    if (!method) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    
    // Check if this is the only payment method
    const count = await PaymentMethod.countDocuments({ user: req.user.id });
    
    if (count === 1) {
      return res.status(400).json({ message: 'Cannot delete the only payment method' });
    }
    
    // If deleting default method, set another one as default
    if (method.isDefault) {
      const anotherMethod = await PaymentMethod.findOne({
        user: req.user.id,
        _id: { $ne: id }
      });
      
      if (anotherMethod) {
        anotherMethod.isDefault = true;
        await anotherMethod.save();
      }
    }
    
    await PaymentMethod.findByIdAndDelete(id);
    
    res.json({ message: 'Payment method deleted' });
  } catch (error) {
    console.error('Delete payment method error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Process payment
const processPayment = async (req, res) => {
  try {
    const { amount, paymentMethodId, orderId } = req.body;
    
    // Find payment method
    const method = await PaymentMethod.findOne({
      _id: paymentMethodId,
      user: req.user.id
    });
    
    if (!method) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    
    // Find order
    const order = await Order.findOne({
      _id: orderId,
      user: req.user.id
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Simulate payment processing
    // In a real app, this would integrate with a payment gateway
    const paymentSuccessful = Math.random() > 0.1; // 90% success rate for simulation
    
    if (!paymentSuccessful) {
      return res.status(400).json({ message: 'Payment processing failed' });
    }
    
    // Update order status
    order.paymentStatus = 'paid';
    order.status = 'processing';
    await order.save();
    
    res.json({
      success: true,
      transactionId: `tr_${Date.now()}`,
      amount,
      paymentMethod: method.type,
      orderId
    });
  } catch (error) {
    console.error('Process payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  processPayment 
}
