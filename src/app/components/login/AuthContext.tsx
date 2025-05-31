
'use client';

import { generateToken } from '@/types/auth';
import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Simple User interface for our auth system
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a production environment, this would be replaced with actual API calls
// const API_URL = '/api'; // Update with your actual API URL

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize axios with auth header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load auth state from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored auth data:", error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // In production, this would be an actual API call
      // const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      // const { user, token } = response.data;

      // Ultra-fast optimized authentication
      const mockResponse = await new Promise<{ user: User, token: string }>((resolve, reject) => {
        // Reduced delay for ultra-fast performance
        setTimeout(() => {
          try {
            // Validation
            if (!email) {
              reject(new Error('Email is required'));
              return;
            }
            if (!password) {
              reject(new Error('Password is required'));
              return;
            }

            // Hard-coded admin user for development (Owner of GROW YouR NEED)
            // Admin doesn't need role selection - they are the service owner
            if (email === 'admin' && password === '123') {
              const mockUser: User = {
                id: 'admin-123',
                firstName: 'GROW',
                lastName: 'Admin',
                email: 'admin@exemple.com',
                role: 'admin',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                avatar: 'https://picsum.photos/seed/admin/100/100'
              };

              // Generate JWT token
              const token = generateToken(32);

              resolve({ user: mockUser, token });
              return;
            }

            // For regular users
            if (password === 'password123') {
              const mockUser: User = {
                id: `user-${Date.now()}`,
                firstName: 'Regular',
                lastName: 'User',
                email: email,
                role: 'user',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                avatar: `https://picsum.photos/seed/user/100/100`
              };

              const token = generateToken(32);

              resolve({ user: mockUser, token });
              return;
            }

            // If no credentials match, reject
            reject(new Error('Invalid credentials'));
            return;
          } catch (error) {
            reject(error);
          }
        }, 200); // Ultra-fast 200ms delay
      });

      // Set auth state
      console.log('🔑 Setting auth state:', { user: mockResponse.user, token: mockResponse.token });
      setToken(mockResponse.token);
      setUser(mockResponse.user);
      setIsAuthenticated(true);
      console.log('✅ Auth state updated - isAuthenticated: true');

      // Store in localStorage
      localStorage.setItem('authToken', mockResponse.token);
      localStorage.setItem('authUser', JSON.stringify(mockResponse.user));
      console.log('💾 Auth data stored in localStorage');
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // In production, you might want to call an API to invalidate the token
    // await axios.post(`${API_URL}/auth/logout`);

    setUser(null);
    setToken(undefined);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }, []);

  const register = useCallback(async (userData: Partial<User>) => {
    // Implement registration logic
    console.log('Registration data:', userData);
    throw new Error('Registration not implemented');
  }, []);

  const updateUser = useCallback(async (userData: Partial<User>) => {
    // Implement user update logic
    console.log('Update user data:', userData);
    throw new Error('Update user not implemented');
  }, []);

  const refreshToken = useCallback(async () => {
    // Implement token refresh logic
    throw new Error('Refresh token not implemented');
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
