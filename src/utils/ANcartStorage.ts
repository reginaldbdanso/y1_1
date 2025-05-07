import { CartItem } from '../types/cart';

const CART_STORAGE_KEY = 'an_cart';

// Get cart from localStorage
export const getANCart = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
};

// Add or update item in cart
export const addItemToANLSCart = (item: CartItem): CartItem[] => {
  const currentCart = getANCart();
  const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    const updatedCart = currentCart.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  } else {
    const updatedCart = [...currentCart, item];
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  }
};

// Update item quantity
export const updateItemQuantityInANLSCart = (productId: string, quantity: number): CartItem[] => {
  const currentCart = getANCart();
  const updatedCart = currentCart.map(item =>
    item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item
  );
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  return updatedCart;
};

// Remove item from cart
export const removeItemFromANLSCart = (productId: string): CartItem[] => {
  const currentCart = getANCart();
  const updatedCart = currentCart.filter(item => item.id !== productId);
  
  if (updatedCart.length === 0) {
    localStorage.removeItem(CART_STORAGE_KEY);
  } else {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  }
  
  return updatedCart;
};

// Clear entire cart
export const clearANLSCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

// import axios, { AxiosInstance } from 'axios';
// import { CartItem } from '../context/CartContext';

// interface ApiCartItem {
//   productId: string;
//   quantity: number;
// }
// interface CartResponse {
//   items: ApiCartItem[];
// }
// export class CartApi {
//   private api: AxiosInstance;

//   constructor(token: string) {
//     this.api = axios.create({
//       baseURL: import.meta.env.VITE_API_URL,
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }
//   // Get cart from API
//   async getCart(): Promise<CartResponse> {
//     try {
//       const response = await this.api.get('/cart');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       throw error;
//     }
//   }
//   // Add item to cart
//   async addItem(productId: string, quantity: number): Promise<CartResponse> {
//     try {
//       const response = await this.api.post('/cart/items', { productId, quantity });
//       return response.data;
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//       throw error;
//     }
//   }
//   // Update item quantity
//   async updateItemQuantity(productId: string, quantity: number): Promise<CartResponse> {
//     try {
//       const response = await this.api.put(`/cart/items/${productId}`, { quantity });
//       return response.data;
//     } catch (error) {
//       console.error('Error updating item quantity:', error);
//       throw error;
//     }
//   }
//   // Remove item from cart
//   async removeItem(productId: string): Promise<CartResponse> {
//     try {
//       const response = await this.api.delete(`/cart/items/${productId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//       throw error;
//     }
//   }
//   // Clear cart
//   async clearCart(): Promise<void> {
//     try {
//       await this.api.delete('/cart');
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//       throw error;
//     }
//   }
//   // Merge cart
//   async mergeCart(items: CartItem[]): Promise<CartResponse> {
//     try {
//       const transformedItems = items.map(item => ({
//         productId: item.id,
//         quantity: item.quantity
//       }));
      
//       const response = await this.api.post('/cart/merge', { items: transformedItems });
//       return response.data;
//     } catch (error) {
//       console.error('Error merging cart:', error);
//       throw error;
//     }
//   }
// }