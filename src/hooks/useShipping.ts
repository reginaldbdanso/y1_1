import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface ShippingAddress {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  district: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}

export const useShipping = () => {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state: { user } } = useAuth();

  const fetchAddresses = async () => {
    if (!user.token) return;
    
    setLoading(true);
    setError(null);
    
    const abortController = new AbortController();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/shipping/addresses`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        signal: abortController.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAddresses(data.addresses || []);
    } catch (err: any) {
      // Only set error if it's not an abort error
      if (err.name !== 'AbortError') {
        setError(err instanceof Error ? err.message : 'Failed to fetch shipping addresses');
        console.error('Error fetching shipping addresses:', err);
      }
    } finally {
      setLoading(false);
    }

    return abortController;
  };

  const addAddress = async (address: ShippingAddress) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch(`${import.meta.env.VITE_API_URL}/shipping/addresses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...address, userId: user.id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add shipping address');
      }
      
      const newAddress = await response.json();
      setAddresses(prev => [...prev, newAddress]);
      return newAddress;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error adding shipping address:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id: string, address: Partial<ShippingAddress>) => {
    if (!user) return;
    
    console.log(`id: ${id} and address: ${address}`)
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch(`${import.meta.env.VITE_API_URL}/shipping/addresses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...address, userId: user.id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update shipping address');
      }
      
      const updatedAddress = await response.json();
      setAddresses(prev => prev.map(addr => addr._id === id ? updatedAddress : addr));
      return updatedAddress;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error updating shipping address:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    console.log(`id: ${id}`)
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch(`${import.meta.env.VITE_API_URL}/shipping/addresses/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete shipping address');
      }
      
      setAddresses(prev => prev.filter(addr => addr._id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error deleting shipping address:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (id: string) => {
    if (!user) return;
    
    console.log(`id: ${id}`);
    try {
      // First update the address to be default
      await updateAddress(id, { isDefault: true });
      
      // Then update all other addresses to not be default
      const otherAddresses = addresses.filter(addr => addr._id !== id);
      for (const addr of otherAddresses) {
        if (addr.isDefault) {
          await updateAddress(addr._id, { isDefault: false });
        }
      }
      
      // Refresh the addresses
      await fetchAddresses();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error setting default address:', err);
      return false;
    }
  };

  return {
    addresses,
    loading,
    error,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
};