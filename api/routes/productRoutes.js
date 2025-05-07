const express = require('express');
const { 
  createProduct, 
  getProducts, 
  getProduct,
  deleteProduct 
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

router.post('/', 
  protect, 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'thumbnails', maxCount: 5 }
  ]), createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;