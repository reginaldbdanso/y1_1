const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');

// Get user wishlist
router.get('/', protect, wishlistController.getWishlist);

// Add product to wishlist
router.post('/add', protect, wishlistController.addToWishlist);

// Remove product from wishlist
router.delete('/remove/:productId', protect, wishlistController.removeFromWishlist);

// Check if product is in wishlist
router.get('/check/:productId', protect, wishlistController.checkWishlist);

// Clear wishlist
router.delete('/clear', protect, wishlistController.clearWishlist);

module.exports = router;