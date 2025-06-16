'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { login as serverLogin } from '@/app/actions/authActions';
import {
  setServerCookie,
  getServerCookie,
  removeServerCookie,
} from '@/app/actions/cookiesActions';
import { refreshTokens } from '@/app/actions/tokenActions';
import { useRouter } from 'next/navigation';
import { handleError } from '@/utils/errorUtils';
import { checkIfTokenExpired } from '@/utils/tokensUtils';
import { SECRET_TOKEN } from '@/config/env';

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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleLogin = async (identifier: string, password: string) => {
    try {
      const {
        accessToken,
        refreshToken,
        role: userRole,
      } = await serverLogin(identifier, password);

      // Définir les cookies via les Server Actions
      await setServerCookie('accessToken', accessToken, SECRET_TOKEN);
      await setServerCookie('refreshToken', refreshToken, SECRET_TOKEN);
      await setServerCookie('role', userRole, SECRET_TOKEN);

      // Mettre à jour l'état
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
      throw handleError(error);
    }
  };

  const handleLogout = async () => {
    // Supprimer les cookies via les Server Actions
    await removeServerCookie('accessToken', SECRET_TOKEN);
    await removeServerCookie('refreshToken', SECRET_TOKEN);
    await removeServerCookie('role', SECRET_TOKEN);

    // Réinitialiser l'état
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);

    router.push('/login');
  };

  // Vérification d'autorisation basée sur le rôle
  const isAuthorized = (requiredRole: string) => {
    return role === requiredRole;
  };

  // Initialisation de l'authentification à partir des cookies via les Server Actions
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedAccessToken = await getServerCookie(
          'accessToken',
          SECRET_TOKEN,
        );
        const storedRefreshToken = await getServerCookie(
          'refreshToken',
          SECRET_TOKEN,
        );
        const storedRole = await getServerCookie('role', SECRET_TOKEN);

        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
        }
        if (storedRefreshToken) {
          setRefreshToken(storedRefreshToken);
        }
        if (storedRole) {
          setRole(storedRole);
        }

        // Rafraîchir le token si nécessaire
        if (storedAccessToken && storedRefreshToken) {
          const isTokenExpired = checkIfTokenExpired(storedAccessToken);

          if (isTokenExpired) {
            // Appeler la Server Action pour rafraîchir les tokens
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = await refreshTokens();

            // Mettre à jour les tokens
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken || storedRefreshToken);
          }
        }
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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

// Hook personnalisé pour accéder au contexte Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
