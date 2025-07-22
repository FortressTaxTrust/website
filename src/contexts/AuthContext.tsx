'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  login as apiLogin,
  clearAuth,
  saveTokens,
  isAuthenticated,
  getCurrentUser,
  parseJWT,
  getAccessToken
} from '@/utils/auth';

interface User {
  username: string;
  email?: string;
  sub: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = () => {
    try {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          // Try to get user info from access token
          const accessToken = getAccessToken();
          if (accessToken) {
            const tokenData = parseJWT(accessToken);
            setUser({
              username: tokenData?.username || '',
              sub: tokenData?.sub || '',
            });
          }
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin(username, password);
      
      if (response.status === 'success') {
        // Save tokens and set user
        saveTokens(response.tokens);
        checkAuth();
        return response;
      } else if (response.status === 'MFA_SETUP_REQUIRED' || response.status === 'TOTP_MFA_REQUIRED') {
        // Return the response for MFA handling
        return response;
      }
      
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    router.push('/client-portal');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
