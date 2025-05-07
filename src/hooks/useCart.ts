import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CartItem } from '../context/CartContext';
import { CartApi } from '../utils/cartApi';
import * as cartStorage from '../utils/cartStorage';
import { useProducts } from '../context/ProductContext';

interface UseCartReturn {
  cart: CartItem[];
  isLoading: boolean;
  error: string | null;
  addToCart: (product: { id: string; title: string; price: number; image: string }) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, change: number) => Promise<void>;
  clearCart: () => Promise<void>;
  subtotal: number;
  cartCount: number;
}

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<CartItem[]>(cartStorage.getCart());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state: authState } = useAuth();
  const { products } = useProducts();

  // Initialize CartApi instance when user is logged in
  const cartApi = authState.user.isLoggedIn ? new CartApi(authState.user.token) : null;

  // Transform API cart items to CartItem format
  const transformApiCartItems = useCallback((apiItems: any[]) => {
    return apiItems.map(item => ({
      id: item.productId,
      title: products.find(p => p._id === item.productId)?.title || '',
      price: products.find(p => p._id === item.productId)?.price || 0,
      image: products.find(p => p._id === item.productId)?.image || '',
      quantity: item.quantity
    }));
  }, [products]);

  // Sync cart with API when user logs in
  useEffect(() => {
    const syncCart = async () => {
      if (authState.user.isLoggedIn && cartApi) {
        setIsLoading(true);
        try {
          // Get local cart
          const localCart = cartStorage.getCart();

          if (localCart.length > 0) {
            // Store local cart in API
            await cartApi.storeCart(localCart);
          }

          // Get updated cart from API
          const apiCart = await cartApi.getStoredCart();
          const transformedCart = transformApiCartItems(apiCart.items);
          
          // Update local storage with API cart
          setCart(transformedCart);
          localStorage.setItem('cart', JSON.stringify(transformedCart));
        } catch (err) {
          setError('Error syncing cart');
          console.error('Error syncing cart:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    syncCart();
  }, [authState.user.isLoggedIn, cartApi, transformApiCartItems]);

  // Add item to cart
//   const addToCart = async (product: { id: string; title: string; price: number; image: string }) => {
//     setIsLoading(true);
//     try {
//       if (cartApi) {
//         // For logged-in users, update API first
//         await cartApi.storeCart([...cart, { ...product, quantity: 1 }]);
//         const apiCart = await cartApi.getStoredCart();
//         const transformedCart = transformApiCartItems(apiCart.items);
//         setCart(transformedCart);
//         localStorage.setItem('cart', JSON.stringify(transformedCart));
//       } else {
//         // For anonymous users, update localStorage
//         const updatedCart = cartStorage.addItem({ ...product, quantity: 1 });
//         setCart(updatedCart);
//       }
//     } catch (err) {
//       setError('Error adding item to cart');
//       console.error('Error adding item to cart:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  // Remove item from cart
//   const removeFromCart = async (productId: string) => {
//     setIsLoading(true);
//     try {
//       if (cartApi) {
//         // Update API for logged-in users
//         await cartApi.removeItem(productId);
//         const apiCart = await cartApi.getCart();
//         const transformedCart = transformApiCartItems(apiCart.items);
//         setCart(transformedCart);
//         storeCart(transformedCart);
//       } else {
//         // Update local storage for anonymous users
//         const updatedCart = cart.filter(item => item.id !== productId);
//         setCart(updatedCart);
//         storeCart(updatedCart);
//       }
//     } catch (err) {
//       setError('Error removing item from cart');
//       console.error('Error removing item from cart:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  // Update item quantity
//   const updateQuantity = async (productId: string, change: number) => {
//     setIsLoading(true);
//     try {
//       const item = cart.find(item => item.id === productId);
//       if (!item) return;

//       const newQuantity = Math.max(1, item.quantity + change);

//       if (cartApi) {
//         // Update API for logged-in users
//         await cartApi.updateItemQuantity(productId, newQuantity);
//         const apiCart = await cartApi.getCart();
//         const transformedCart = transformApiCartItems(apiCart.items);
//         setCart(transformedCart);
//         storeCart(transformedCart);
//       } else {
//         // Update local storage for anonymous users
//         const updatedCart = cart.map(item =>
//           item.id === productId ? { ...item, quantity: newQuantity } : item
//         );
//         setCart(updatedCart);
//         storeCart(updatedCart);
//       }
//     } catch (err) {
//       setError('Error updating item quantity');
//       console.error('Error updating item quantity:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  // Clear cart
//   const clearCart = async () => {
//     setIsLoading(true);
//     try {
//       if (cartApi) {
//         // Clear API cart for logged-in users
//         await cartApi.clearCart();
//       }
//       // Clear local storage and state
//       setCart([]);
//       clearStoredCart();
//     } catch (err) {
//       setError('Error clearing cart');
//       console.error('Error clearing cart:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    cartCount
  };
};