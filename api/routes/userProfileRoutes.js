const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const userProfileController = require('../controllers/userProfileController');

// User profile routes
router.get('/profile', protect, userProfileController.getUserProfile);
router.put('/profile', protect, userProfileController.updateUserProfile);
router.put('/change-password', protect, userProfileController.changePassword);

// User address routes
router.get('/addresses', protect, userProfileController.getUserAddresses);
router.post('/addresses', protect, userProfileController.addUserAddress);
router.put('/addresses/:addressId', protect, userProfileController.updateUserAddress);
router.delete('/addresses/:addressId', protect, userProfileController.deleteUserAddress);

module.exports = router;

