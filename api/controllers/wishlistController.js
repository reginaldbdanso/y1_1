const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Get user wishlist
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate({
      path: 'products',
      select: '_id title price image rating reviews brand category'
    });

    if (!wishlist) {
      // Create empty wishlist if none exists
      wishlist = new Wishlist({
        user: req.user.id,
        products: []
      });
      await wishlist.save();

      // Return empty wishlist
      return res.json({
        _id: wishlist._id,
        products: []
      });
    }

    // Add isFavorite flag to each product
    const productsWithFavorite = wishlist.products.map(product => {
      const productObj = product.toObject();
      productObj.isFavorite = true;
      return productObj;
    });

    res.json({
      _id: wishlist._id,
      products: productsWithFavorite
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find user's wishlist or create new one
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        products: [productId]
      });
    } else {
      // Check if product already in wishlist
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();

    // Return updated wishlist with populated product details
    const updatedWishlist = await Wishlist.findById(wishlist._id).populate({
      path: 'products',
      select: '_id title price image rating reviews brand category'
    });

    // Add isFavorite flag to each product
    const productsWithFavorite = updatedWishlist.products.map(product => {
      const productObj = product.toObject();
      productObj.isFavorite = true;
      return productObj;
    });

    res.json({
      _id: updatedWishlist._id,
      products: productsWithFavorite
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find user's wishlist
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Remove product from wishlist
    wishlist.products = wishlist.products.filter(
      product => product.toString() !== productId
    );

    await wishlist.save();

    // Return updated wishlist with populated product details
    const updatedWishlist = await Wishlist.findById(wishlist._id).populate({
      path: 'products',
      select: '_id title price image rating reviews brand category'
    });

    // Add isFavorite flag to each product
    const productsWithFavorite = updatedWishlist.products.map(product => {
      const productObj = product.toObject();
      productObj.isFavorite = true;
      return productObj;
    });

    res.json({
      _id: updatedWishlist._id,
      products: productsWithFavorite
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check if product is in wishlist
const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find user's wishlist
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.json({ isFavorite: false });
    }

    // Check if product is in wishlist
    const isFavorite = wishlist.products.some(
      product => product.toString() === productId
    );

    res.json({ isFavorite });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Clear wishlist
const clearWishlist = async (req, res) => {
  try {
    // Find user's wishlist
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Clear products
    wishlist.products = [];
    await wishlist.save();

    res.json({
      _id: wishlist._id,
      products: []
    });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
  clearWishlist,
};
