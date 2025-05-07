const Review = require('../../models/Review.js');

// Create a new review
const createreview = async (reviewData) => {
  try {
    const review = new Review(reviewData);
    return await review.save();
  } catch (error) {
    throw new Error (`Error creating review: ${error.message}`);
  }
};

// Get all reviews
const getAllReviews = async () => {
  try {
    return await Review.find();
  } catch (error) {
    throw new Error (`Error getting all reviews: ${error.message}`);
  }
};

// Get review by ID
const getReviewById = async (reviewId) => {
  try {
    return await Review.findById(reviewId);
  } catch (error) {
    throw new Error (`Error getting review by Id: ${error.message}`);
  }
};

// Update review
const updatereview = async (reviewId, updateData) => {
  try {
    return await Review.findByIdAndUpdate(reviewId, updateData, { new: true });
  } catch (error) {
    throw new Error (`Error updating a single review: ${error.message}`);
  }
};

// Delete review
const deletereview = async (reviewId) => {
  try {
    return await Review.findByIdAndDelete(reviewId);
  } catch (error) {
    throw new Error (`Error deleting a single reviews: ${error.message}`);
  }
};

// Get reviews by user ID
const getReviewsByProductId = async (productId) => {
  try {
    return await Review.find({ productId: productId });
  } catch (error) {
    throw new Error (`Error getting reviews for this product: ${error.message}`);
  }
};

module.exports = {
  createreview,
  getAllReviews,
  getReviewById,
  updatereview,
  deletereview,
  getReviewsByProductId
};
