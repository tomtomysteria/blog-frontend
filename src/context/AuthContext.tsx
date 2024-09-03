'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import {
  getStoredItem,
  setStoredItem,
  removeStoredItem,
} from '../utils/localStorageUtils';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  login: (accessToken: string, refreshToken: string, role: string) => void;
  logout: () => void;
  isAuthorized?: (requiredRole: string) => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Load tokens and role from localStorage when the component mounts
  useEffect(() => {
    const storedAccessToken = getStoredItem('accessToken');
    const storedRefreshToken = getStoredItem('refreshToken');
    const storedRole = getStoredItem('role');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setRole(storedRole);
    }
  }, []);

  const login = (
    newAccessToken: string,
    newRefreshToken: string,
    userRole: string,
  ) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setRole(userRole);
    setStoredItem('accessToken', newAccessToken);
    setStoredItem('refreshToken', newRefreshToken);
    setStoredItem('role', userRole);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
    removeStoredItem('accessToken');
    removeStoredItem('refreshToken');
    removeStoredItem('role');
  };

  const isAuthorized = (requiredRole: string) => {
    return role === requiredRole || role === 'super-admin';
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, role, login, logout, isAuthorized }}
    >
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
