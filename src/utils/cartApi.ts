import axios, { AxiosInstance } from 'axios';
import { CartItem } from '../types/cart';

interface ApiCartItem {
  productId: string;
  quantity: number;
}

interface CartResponse {
  items: ApiCartItem[];
}

export class CartApi {
  private api: AxiosInstance;

  constructor(token: string) {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Get cart from API
  async getStoredCart(): Promise<CartResponse> {
    try {
      const response = await this.api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart from API:', error);
      throw error;
    }
  }

  // Store cart in API
  async storeCart(items: CartItem[]): Promise<CartResponse> {
    try {
      const transformedItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));
      
      const response = await this.api.post('/cart/merge', { items: transformedItems });
      return response.data;
    } catch (error) {
      console.error('Error storing cart in API:', error);
      throw error;
    }
  }

  // Clear cart in API
  async clearStoredCart(): Promise<void> {
    try {
      await this.api.delete('/cart');
    } catch (error) {
      console.error('Error clearing cart in API:', error);
      throw error;
    }
  }
}

// import { CartItem } from '../context/CartContext';

// const CART_STORAGE_KEY = 'cart';

// // Retrieve the cart from localStorage
// export const getStoredCart = (): CartItem[] => {
//   try {
//     const savedCart = localStorage.getItem(CART_STORAGE_KEY);
//     return savedCart ? JSON.parse(savedCart) : [];
//   } catch (error) {
//     console.error('Error parsing cart from localStorage:', error);
//     localStorage.removeItem(CART_STORAGE_KEY);
//     return [];
//   }
// };

// // Store the cart in localStorage
// export const storeCart = (cart: CartItem[]): void => {
//   try {
//     if (cart.length > 0) {
//       localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
//       console.log('Cart stored in localStorage');
//     } else {
//       localStorage.removeItem(CART_STORAGE_KEY);
//       console.log('Cart removed from localStorage');
//     }
//   } catch (error) {
//     console.error('Error storing cart in localStorage:', error);
//   }
// };

// // Clear the cart from localStorage
// export const clearStoredCart = (): void => {
//   localStorage.removeItem(CART_STORAGE_KEY);
//   console.log('Cart cleared from localStorage');
// };