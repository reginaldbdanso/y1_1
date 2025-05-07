const express = require('express');
const { 
  getCart,
  addCart,
  updateCartContent,
  removeItemFromCart,
  clearEntireCart,
  addItemsToCart,
  addSingleItem
} = require('../controllers/cartController.js');
const { protect } = require('../middleware/auth.js');
const { execPath } = require('process');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Cart routes
router.route('/')
.get(getCart)
// .post(addCart)
.delete(clearEntireCart);

router.route('/merge')
  .post(addItemsToCart)

  router.route('/item')
  .post(addSingleItem)

router.route('/:itemId')
  .put(updateCartContent)
  .delete(removeItemFromCart);

module.exports = router;
