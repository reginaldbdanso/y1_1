const { StatusCodes } = require('http-status-codes');
const cartService = require('../services/cart/cartService');

// Get cart by user ID
const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCartByUserId(req.user.id);
    // console.log("Cart: ", cart);
    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
    }
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Add item to cart
const addCart = async (req, res) => {
  try {
    // console.log("REQ.BODY: ", req.body); 
    const { productId, quantity } = req.body;
    const cart = await cartService.createCart(req.user.id);
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Update cart item quantity
const updateCartContent = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.updateCartItem(req.user.id, productId, quantity);
    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart or item not found' });
    }
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
const addSingleItem = async (req, res) => {
  try {
    // console.log("REQ.BODY: ", req.body);
    const { productId, quantity } = req.body;
    const cart = await cartService.addingSingleItem(req.user.id, productId, quantity);
    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart or item not found' });
    }
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Remove item from cart
const addItemsToCart = async (req, res) => {
  // let index = 1;
  // console.log("REQ.BODY: ", req.body);
  try {
    const { items } = req.body;
    const cart = await Promise.all(items.map(item => {
      cartService.addItemToCart(req.user.id, item)
      console.log(`Item ${item.productId} added to cart`)
    }));
    res.status(StatusCodes.OK).json(cart);

  } catch (error) {
    console.log("ERROR: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await cartService.removeFromCart(req.user.id, productId);
    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
    }
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Clear cart
const clearEntireCart = async (req, res) => {
  try {
    const result = await cartService.clearCart(req.user.id);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
    }
    res.status(StatusCodes.OK).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addCart,
  updateCartContent,
  removeItemFromCart,
  clearEntireCart,
  addItemsToCart,
  addSingleItem
};

