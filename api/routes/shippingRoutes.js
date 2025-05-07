const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const shippingController = require('../controllers/shippingController');

// All routes are protected with authentication
router.use(protect);

// Get all addresses for a user
router.get('/addresses', shippingController.getAddresses);

// Add a new address
router.post('/addresses', shippingController.addAddress);

// Update an address
router.put('/addresses/:id', shippingController.updateAddress);

// Delete an address
router.delete('/addresses/:id', shippingController.deleteAddress);

module.exports = router;