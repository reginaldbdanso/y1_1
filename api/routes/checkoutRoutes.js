const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const { protect } = require('../middleware/auth');

// Get shipping methods
router.get('/shipping-methods', checkoutController.getShippingMethods);

// Create order
router.post('/order', protect, checkoutController.createOrder);

module.exports = router;