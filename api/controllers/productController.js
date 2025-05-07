const ProductService = require('../services/product/productService');

const createProduct = async (req, res) => {
  try {
    const { 
      title,   
      badge, 
      rating, 
      reviews, 
      price, 
      brand, 
      condition, 
      stock, 
      category, 
      features, 
      specs, 
      descriptions 
    } = req.body;
    
    // if (!req.image || !req.thumbnails) {
    //   return res.status(400).json({ 
    //     success: false, 
    //     message: 'Product image is required' 
    //   });
    // }
       // Extract images from request
       const mainImage = req.files['image'] ? req.files['image'][0].buffer : null;
       const thumbnails = req.files['thumbnails'] ? req.files['thumbnails'].map(file => file.buffer) : [];

    const product = await ProductService.createProduct(
      { 
        title,
        badge,
        rating,
        reviews,
        price,
        brand,
        condition,
        stock,
        category,
        features,
        specs,
        descriptions
      },
      mainImage,
      thumbnails
    );

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts();
    res.json({ success: true, products });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message === 'Product not found' ? error.message : 'Error retrieving product'
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await ProductService.deleteProduct(req.params.id, req.user._id);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct
}
