const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Get user payment methods
router.get('/methods', protect, paymentController.getPaymentMethods);

// Add payment method
router.post('/methods', protect, paymentController.addPaymentMethod);

// Update payment method
router.put('/methods/:id', protect, paymentController.updatePaymentMethod);

// Delete payment method
router.delete('/methods/:id', protect, paymentController.deletePaymentMethod);

// Process payment
router.post('/process', protect, paymentController.processPayment);

module.exports = router;
