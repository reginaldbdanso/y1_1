const express = require('express');
const { 
  createReview,
  getReviews,
  getReview,
  get1ProductReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewsController.js');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

// Public routes
router.get('/', getReviews);
router.get('/:id', getReview);
router.get('/product/:id', get1ProductReviews);

// Protected routes - require authentication
router.use(protect);

// Create review
router.post('/', createReview);

// Update and delete - require authentication and authorization
router.route('/:id')
  .put(updateReview)
  .delete(deleteReview);

module.exports = router;
