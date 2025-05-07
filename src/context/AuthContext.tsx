import React, { createContext, useContext, useReducer, Dispatch, useEffect } from 'react';

// Enhanced user type with more fields
type User = {
  id: string;
  isLoggedIn: boolean;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  email: string;
  token: string;
  role?: string;
};

type AppState = {
  user: User;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

const initialState: AppState = {
  user: {
    id: '',
    isLoggedIn: false,
    username: '',
    email: '',
    token: ''
  },
  loading: false,
  error: null
};

const AuthContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { username: string; email: string; password: string; firstName?: string; lastName?: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}>({
  state: initialState,
  dispatch: () => null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateProfile: async () => false
});

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: {
          ...action.payload,
          isLoggedIn: true
        },
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: initialState.user,
        error: null
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Check for stored auth token on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          // Replace with actual API call when backend is ready
          const response = await fetch(import.meta.env.VITE_API_URL + '/auth', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            dispatch({ 
              type: 'LOGIN_SUCCESS', 
              payload: { 
                ...userData, 
                token,
                isLoggedIn: true 
              } 
            });
          } else {
            // Token is invalid or expired
            localStorage.removeItem('auth_token');
          }
        } catch (error) {
          console.error('Auth check error:', error);
        }
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log("!resonse.ok "+ response.ok)
        dispatch({ type: 'LOGIN_FAILURE', payload: data.message || 'Invalid credentials' });
        return false;
      }

      // Validate required fields in response
      if (!data.token || !data.user) {
        console.log("Login failed: Validation failure")
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid server response' });
        return false;
      }

      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          ...data.user,
          token: data.token,
          isLoggedIn: true 
        } 
      });
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return false;
    }
  };

  const register = async (userData: { username: string; email: string; password: string; firstName?: string; lastName?: string }): Promise<boolean> => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        dispatch({ type: 'REGISTER_FAILURE', payload: errorData.message || 'Registration failed' });
        return false;
      }
      
      const newUserData = await response.json();
      
      // Store token in localStorage
      localStorage.setItem('auth_token', newUserData.token);
      
      dispatch({ 
        type: 'REGISTER_SUCCESS', 
        payload: { 
          ...newUserData,
          isLoggedIn: true 
        } 
      });
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'REGISTER_FAILURE', payload: errorMessage });
      return false;
    }
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('shipping_address');
    localStorage.removeItem('cart');
    
    // Call logout API if needed
    fetch('/api/auth/logout', { method: 'POST' }).catch(err => {
      console.error('Logout error:', err);
    });
    
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      // Replace with actual API call when backend is ready
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/userProfile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.user.token}`
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        return false;
      }
      
      const updatedData = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedData));
      dispatch({ type: 'UPDATE_PROFILE', payload: updatedData });
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      state, 
      dispatch,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
