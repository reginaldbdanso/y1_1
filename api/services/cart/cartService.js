const Cart = require('../../models/Cart');

// Create a new cart
const createCart = async (userId) => {
  try {
    const cart = new Cart({
      userId,
      items: []
    });
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error('Error creating cart: ' + error.message);
  }
};

// Get cart by user ID
const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });
    return cart || {items: []};
  } catch (error) {
    console.log('Error fetching cart:', error.message);
    throw new Error('Error fetching cart: ' + error.message);
  }
};

// Add item to cart
const addItemToCart = async (userId, item) => {
  try {
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = await createCart(userId);
      // Add item to cart
      cart.items.push(item);
    } else {
      const existingItemIndex = cart.items.findIndex(i => i.productId.toString() === item.productId.toString());

      if (existingItemIndex > -1) {
        // If item already exists in cart, update its quantity
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        // If item doesn't exist in cart, add it
        cart.items.push(item);
      }
    }
    
    await cart.save();
    return cart;
  } catch (error) {
    console.log('Error adding item to cart:', error.message);
    throw new Error('Error adding item to cart: ' + error.message);
  }
};

// Update cart content
const addingSingleItem = async (userId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = await createCart(userId);
      // Add item to cart
      cart.items.push(item);

    } else {
      const existingItemIndex = cart.items.findIndex(i => i.productId.toString() === productId.toString());
  
      if (existingItemIndex > -1) {
        // If item already exists in cart, update its quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // If item doesn't exist in cart, add it
        cart.items.push({
          productId: productId,
          quantity: quantity
        });
      }
    }

    await cart.save();
    return cart;
  } catch (error) {
    console.log('Error adding item to cart:', error.message);
    throw new Error('Error adding item to cart: ' + error.message);
  }
};

// Remove item from cart
const removeItemFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());
    cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error('Error removing item from cart: ' + error.message);
  }
};

// Update item quantity in cart
const updateItemQuantity = async (userId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    const item = cart.items.find(item => item.productId.toString() === productId.toString());
    if (!item) throw new Error('Item not found in cart');

    item.quantity = quantity;
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error('Error updating item quantity: ' + error.message);
  }
};

// Clear cart
const clearCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = [];
    cart.total = 0;
    
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error('Error clearing cart: ' + error.message);
  }
};

module.exports = {
  createCart,
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
  addingSingleItem
};
