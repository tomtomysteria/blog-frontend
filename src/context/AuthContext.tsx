'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { login as serverLogin } from '@/app/actions/authActions';
import { refreshToken as refreshAuthToken } from '@/app/actions/tokenActions';
import {
  getStoredItem,
  setStoredItem,
  removeStoredItem,
} from '@/utils/cookiesUtils.client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthorized?: (requiredRole: string) => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    getStoredItem('accessToken') as string | null,
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getStoredItem('refreshToken') as string | null,
  );
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter(); // Utiliser le router pour la redirection

  const handleLogin = async (identifier: string, password: string) => {
    try {
      const {
        accessToken,
        refreshToken,
        role: userRole,
      } = await serverLogin(identifier, password);

      // Stocker les tokens dans les cookies
      setStoredItem('accessToken', accessToken);
      setStoredItem('refreshToken', refreshToken);
      setStoredItem('role', userRole);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setRole(userRole);

      // Redirection en fonction du rôle de l'utilisateur
      if (userRole === 'super-admin' || userRole === 'admin') {
        router.push('/admin');
      } else if (userRole === 'blogger') {
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);

    // Supprimer les cookies
    removeStoredItem('accessToken');
    removeStoredItem('refreshToken');
    removeStoredItem('role');

    router.push('/login');
  };

  const isAuthorized = (requiredRole: string) => {
    return role === requiredRole;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const existingRefreshToken = getStoredItem('refreshToken');

      if (existingRefreshToken) {
        try {
          const { accessToken, refreshToken: newRefreshToken } =
            await refreshAuthToken();
          if (accessToken) {
            setAccessToken(accessToken);
            setStoredItem('accessToken', accessToken);
          }
          if (newRefreshToken) {
            setRefreshToken(newRefreshToken);
            setStoredItem('refreshToken', newRefreshToken);
          }
        } catch (error) {
          console.error('Failed to refresh token on load:', error);
        }
      } else {
        console.log('No refresh token found, user is not logged in.');
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        role,
        login: handleLogin,
        logout: handleLogout,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
