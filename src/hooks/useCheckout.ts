import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShippingAddress } from './useShipping';
import { PaymentMethod } from './usePayment';

export interface CheckoutData {
  shippingAddress: ShippingAddress;
  billingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  shippingMethod: {
    id: string;
    name: string;
    price: number;
    estimatedDelivery: string;
  };
  sameBillingAddress: boolean;
  orderNotes?: string;
  agreeToTerms: boolean;
}

export interface OrderSummary {
  orderId: string;
  orderDate: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
}

export const useCheckout = () => {
  const [checkoutData, setCheckoutData] = useState<Partial<CheckoutData>>({
    sameBillingAddress: true,
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const { state: user } = useAuth();
  const { cart, subtotal, clearCart } = useCart();

  const updateCheckoutData = (data: Partial<CheckoutData>) => {
    setCheckoutData(prev => ({ ...prev, ...data }));
  };

  const validateCheckout = (): boolean => {
    if (!checkoutData.shippingAddress) {
      setError('Shipping address is required');
      return false;
    }

    if (!checkoutData.sameBillingAddress && !checkoutData.billingAddress) {
      setError('Billing address is required');
      return false;
    }

    if (!checkoutData.paymentMethod) {
      setError('Payment method is required');
      return false;
    }

    if (!checkoutData.shippingMethod) {
      setError('Shipping method is required');
      return false;
    }

    if (!checkoutData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }

    return true;
  };

  const placeOrder = async (): Promise<OrderSummary | null> => {
    if (!user || !cart || cart.length === 0) {
      setError('Your cart is empty');
      return null;
    }

    if (!validateCheckout()) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare order data
      const orderData = {
        userId: user.user.id,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: checkoutData.shippingAddress,
        billingAddress: checkoutData.sameBillingAddress 
          ? checkoutData.shippingAddress 
          : checkoutData.billingAddress,
        paymentMethodId: checkoutData.paymentMethod?.id,
        shippingMethodId: checkoutData.shippingMethod?.id,
        orderNotes: checkoutData.orderNotes,
        subtotal: subtotal,
        shipping: checkoutData.shippingMethod?.price || 0,
        tax: subtotal * 0.1, // Calculate tax as 10% of subtotal
        total: subtotal + (checkoutData.shippingMethod?.price || 0) + (subtotal * 0.1), // Calculate total including shipping and tax
      };

      // Replace with actual API call when backend is ready
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const order = await response.json();
      setOrderSummary(order);
      
      // Clear the cart after successful order
      clearCart();
      
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error placing order:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    checkoutData,
    updateCheckoutData,
    loading,
    error,
    orderSummary,
    placeOrder,
    validateCheckout,
  };
};