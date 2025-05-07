import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  preferences?: {
    marketingEmails: boolean;
    orderUpdates: boolean;
    newsletterSubscription: boolean;
  };
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state: user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch(`/api/users/profile/${user.user.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedProfile: Partial<UserProfile>) => {
    if (!user || !profile) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch(`/api/users/profile/${user.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      
      const data = await response.json();
      setProfile(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error updating user profile:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = async (file: File) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      // Replace with actual API call when backend is ready
      const response = await fetch(`/api/users/profile/${user.user.id}/avatar`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }
      
      const data = await response.json();
      setProfile(prev => prev ? { ...prev, avatar: data.avatar } : null);
      return data.avatar;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error updating avatar:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (preferences: UserProfile['preferences']) => {
    if (!user || !profile) return;
    
    return updateProfile({ preferences });
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    updateAvatar,
    updatePreferences,
  };
};