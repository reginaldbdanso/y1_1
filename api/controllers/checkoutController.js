const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const PaymentMethod = require('../models/PaymentMethod');
const mongoose = require('mongoose');

// Get shipping methods
const getShippingMethods = async (req, res) => {
  try {
    // Simulated shipping methods
    const shippingMethods = [
      {
        id: 'standard',
        name: 'Standard Shipping',
        price: 5.99,
        estimatedDelivery: '5-7 business days'
      },
      {
        id: 'express',
        name: 'Express Shipping',
        price: 12.99,
        estimatedDelivery: '2-3 business days'
      },
      {
        id: 'overnight',
        name: 'Overnight Shipping',
        price: 24.99,
        estimatedDelivery: 'Next business day'
      }
    ];
    
    res.json(shippingMethods);
  } catch (error) {
    console.error('Get shipping methods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create order
const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const {
      shippingAddress,
      billingAddress,
      sameBillingAddress,
      shippingMethod,
      paymentMethodId,
      orderNotes
    } = req.body;
    
    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.addressLine1 ||
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode ||
        !shippingAddress.country || !shippingAddress.phoneNumber) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Complete shipping address is required' });
    }
    
    // Validate billing address if not same as shipping
    if (!sameBillingAddress && (!billingAddress || !billingAddress.fullName || 
        !billingAddress.addressLine1 || !billingAddress.city || !billingAddress.state || 
        !billingAddress.zipCode || !billingAddress.country || !billingAddress.phoneNumber)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Complete billing address is required' });
    }
    
    // Validate shipping method
    if (!shippingMethod || !shippingMethod.name || !shippingMethod.price) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Shipping method is required' });
    }
    
    // Validate payment method
    if (!paymentMethodId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Payment method is required' });
    }
    
    // Get payment method
    const paymentMethod = await PaymentMethod.findOne({
      _id: paymentMethodId,
      user: req.user.id
    });
    
    if (!paymentMethod) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Payment method not found' });
    }
    
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Check product availability and prepare order items
    const orderItems = [];
    let subtotal = 0;
    
    for (const item of cart.items) {
      const product = item.product;
      
      // Check if product is still available
      if (product.stock < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ 
          message: `Not enough stock for ${product.title}. Available: ${product.stock}` 
        });
      }
      
      // Add to order items
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
      
      // Update subtotal
      subtotal += product.price * item.quantity;
      
      // Update product stock
      await Product.findByIdAndUpdate(
        product._id,
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }
    
    // Calculate tax (assuming 8% tax rate)
    const tax = subtotal * 0.08;
    const shippingCost = shippingMethod.price;
    const total = subtotal + tax + shippingCost;
    
    // Create new order
    const newOrder = new Order({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      billingAddress: sameBillingAddress ? shippingAddress : billingAddress,
      sameBillingAddress,
      shippingMethod,
      paymentMethod: {
        id: paymentMethod._id,
        type: paymentMethod.type
      },
      subtotal,
      tax,
      shippingCost,
      total,
      orderNotes
    });
    
    await newOrder.save({ session });
    
    // Clear cart
    cart.items = [];
    await cart.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({
      orderId: newOrder._id,
      total: newOrder.total,
      paymentMethod: newOrder.paymentMethod
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getShippingMethods,
  createOrder
};