import React, { createContext, useContext, ReactNode } from "react";
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CartItem } from "../types/cart";
import { CartApi } from "../utils/cartApi";
import * as cartStorage from "../utils/cartStorage";
import * as ANcartStorage from "../utils/ANcartStorage";
import { useProducts } from "../context/ProductContext";

// interface UseCartReturn {
//   cart: CartItem[];
//   isLoading: boolean;
//   error: string | null;
//   addToCart: (product: { id: string; title: string; price: number; image: string }) => Promise<void>;
//   removeFromCart: (productId: string) => Promise<void>;
//   updateQuantity: (productId: string, change: number) => Promise<void>;
//   clearCart: () => Promise<void>;
//   subtotal: number;
//   cartCount: number;
// }

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: {
    id: string;
    title: string;
    price: number;
    image: string;
  }) => Promise<void>;
  removeFromCart: (product: CartItem) => Promise<void>;
  updateQuantity: (product: CartItem, change: number) => Promise<void>;
  clearCart: () => Promise<void>;
  subtotal: number;
  cartCount: number;
  isLoading: boolean;
  error: string | null;
}

interface CartProviderProps {
  children: ReactNode;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // const cartHook = useCartHook();
  const [cart, setCart] = useState<CartItem[]>(cartStorage.getCart());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state: authState } = useAuth();
  const { products } = useProducts();

  // Initialize CartApi instance when user is logged in
  const cartApi = authState.user.isLoggedIn
    ? new CartApi(authState.user.token)
    : null;

  // Transform API cart items to CartItem format
  const transformApiCartItems = useCallback(
    (apiItems: any[]) => {
      return apiItems.map((item) => ({
        id: item.productId,
        title: products.find((p) => p._id === item.productId)?.title || "",
        price: products.find((p) => p._id === item.productId)?.price || 0,
        image: products.find((p) => p._id === item.productId)?.image || "",
        quantity: item.quantity,
      }));
    },
    [products]
  );

  const syncCart = async () => {
    if (authState.user.isLoggedIn && cartApi && products.length > 0) {
      setIsLoading(true);
      try {
        // Get local cart
        const localCart = ANcartStorage.getANCart();

        if (localCart.length > 0) {
          // Store local cart in API
          await cartApi.storeCart(localCart);
        }

        // Get updated cart from API
        const apiCart = await cartApi.getStoredCart();
        const transformedCart = transformApiCartItems(apiCart.items);

        // Update local storage with API cart
        setCart(transformedCart);
        localStorage.setItem("cart", JSON.stringify(transformedCart));
        // Clear Anonymous local storage
        ANcartStorage.clearANLSCart();
        console.log("Anonymous LocalStorage Cart cleared");
      } catch (err) {
        setError("Error syncing cart");
        console.error("Error syncing cart:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("User is not logged in or cartApi is not initialized");
      setCart([])
    }
  };

  // Sync cart with API when user logs in
  useEffect(() => {
    syncCart();
  }, [
    authState.user.isLoggedIn,
    products
    // cartApi,
    // transformApiCartItems
  ]);

  // Add item to cart
  const addToCart = async (product: {
    id: string;
    title: string;
    price: number;
    image: string;
  }) => {
    const cartItem: CartItem = { ...product, quantity: 1 };
    if (authState.user.isLoggedIn && cartApi) {
      try {
        cartStorage.addItemToLSCart(cartItem);
        console.log(`${cartItem.title} added to LocalStorage Cart`);
        setCart(cartStorage.getCart());
      } catch (err) {
        setError("Error adding item to cart");
        console.error("Error adding item to cart:", err);
      }
    } else {
      try {
        ANcartStorage.addItemToANLSCart(cartItem);
        console.log(`${cartItem.title} added to anonymous LocalStorage Cart`);
        setCart(ANcartStorage.getANCart());
      } catch (err) {
        setError("Error adding item to cart");
        console.error("Error adding item to cart:", err);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (product: CartItem) => {
    if (authState.user.isLoggedIn && cartApi) {
      try {
        cartStorage.removeItemFromLSCart(product.id);
        console.log(`${product.title} removed from LocalStorage Cart`);
        setCart(cartStorage.getCart());
      } catch (err) {
        setError("Error removing item from cart");
        console.error("Error removing item from cart:", err);
      }
    } else {
      try {
        ANcartStorage.removeItemFromANLSCart(product.id);
        console.log(`${product.title} removed from anonymous LocalStorage Cart`);
        setCart(ANcartStorage.getANCart());
      } catch (err) {
        setError("Error removing item from cart");
        console.error("Error removing item from cart:", err);
      }
    }
  };

  // Update item quantity
  const updateQuantity = async (product: CartItem, change: number) => {
    if (authState.user.isLoggedIn && cartApi) {
      try {
        cartStorage.updateItemQuantityInLSCart(product.id, change);
        console.log(`${product.title} quantity updated in LocalStorage Cart`);
        setCart(cartStorage.getCart());
      } catch (err) {
        setError("Error updating item quantity");
        console.error("Error updating item quantity:", err);
      }
    } else {
      try {
        ANcartStorage.updateItemQuantityInANLSCart(product.id, change);
        console.log(`${product.title} quantity updated in anonymous LocalStorage Cart`);
        setCart(ANcartStorage.getANCart());
      } catch (err) {
        setError("Error updating item quantity");
        console.error("Error updating item quantity:", err);
      }
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (authState.user.isLoggedIn && cartApi) {
      try {
        cartStorage.clearLSCart();
        console.log(`LocalStorage Cart cleared`);
        setCart(cartStorage.getCart());
      } catch (err) {
        setError("Error clearing cart");
        console.error("Error clearing cart:", err);
      }
    } else {
      try {
        ANcartStorage.clearANLSCart();
        console.log(`anonymous LocalStorage Cart cleared`);
        setCart(ANcartStorage.getANCart());
      } catch (err) {
        setError("Error clearing cart");
        console.error("Error clearing cart:", err);
      }
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // return {

  // };

  return (
    <CartContext.Provider
      value={{
        // cartHook
        cart,
        isLoading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
