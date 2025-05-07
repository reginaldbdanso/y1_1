import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  isDefault: boolean;
  details: {
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    email?: string;
  };
}

export const usePayment = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state: user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPaymentMethods();
    }
  }, [user]);

  const fetchPaymentMethods = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call when backend is ready
      // const response = await fetch(`/api/payment/methods?userId=${user.user.id}`);
      
      // const contentType = response.headers.get('content-type');
      // if (!contentType || !contentType.includes('application/json')) {
      //   throw new Error('Invalid response format. Expected JSON but received different content type.');
      // }

      // if (!response.ok) {
      //   throw new Error('Failed to fetch payment methods');
      // }
      
      // const data = await response.json();
      // setPaymentMethods(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching payment methods:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async (method: Omit<PaymentMethod, 'id'>) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch('/api/payment/methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...method, userId: user.user.id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add payment method');
      }
      
      const newMethod = await response.json();
      setPaymentMethods(prev => [...prev, newMethod]);
      return newMethod;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error adding payment method:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentMethod = async (id: string, method: Partial<PaymentMethod>) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch(`/api/payment/methods/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...method, userId: user.user.id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update payment method');
      }
      
      const updatedMethod = await response.json();
      setPaymentMethods(prev => prev.map(m => m.id === id ? updatedMethod : m));
      return updatedMethod;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error updating payment method:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePaymentMethod = async (id: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch(`/api/payment/methods/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete payment method');
      }
      
      setPaymentMethods(prev => prev.filter(m => m.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error deleting payment method:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const setDefaultPaymentMethod = async (id: string) => {
    if (!user) return;
    
    try {
      // First update the method to be default
      await updatePaymentMethod(id, { isDefault: true });
      
      // Then update all other methods to not be default
      const otherMethods = paymentMethods.filter(m => m.id !== id);
      for (const method of otherMethods) {
        if (method.isDefault) {
          await updatePaymentMethod(method.id, { isDefault: false });
        }
      }
      
      // Refresh the payment methods
      await fetchPaymentMethods();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error setting default payment method:', err);
      return false;
    }
  };

  const processPayment = async (amount: number, paymentMethodId: string, orderId: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.user.id,
          amount,
          paymentMethodId,
          orderId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to process payment');
      }
      
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error processing payment:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    paymentMethods,
    loading,
    error,
    fetchPaymentMethods,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    processPayment,
  };
};