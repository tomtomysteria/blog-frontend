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
} from '@/app/actions/cookiesActions'; // Import des Server Actions
import { useRouter } from 'next/navigation';
import { handleError } from '@/utils/errorUtils';

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
  const router = useRouter(); // Utiliser le router pour la redirection

  // Fonction de login
  const handleLogin = async (identifier: string, password: string) => {
    try {
      const {
        accessToken,
        refreshToken,
        role: userRole,
      } = await serverLogin(identifier, password);

      // Définir les cookies via les Server Actions
      await setServerCookie('accessToken', accessToken);
      await setServerCookie('refreshToken', refreshToken);
      await setServerCookie('role', userRole);

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

  // Fonction de logout
  const handleLogout = async () => {
    // Supprimer les cookies via les Server Actions
    await removeServerCookie('accessToken');
    await removeServerCookie('refreshToken');
    await removeServerCookie('role');

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
        const storedAccessToken = await getServerCookie('accessToken');
        const storedRefreshToken = await getServerCookie('refreshToken');
        const storedRole = await getServerCookie('role');

        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
        }
        if (storedRefreshToken) {
          setRefreshToken(storedRefreshToken);
        }
        if (storedRole) {
          setRole(storedRole);
        }
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
      } finally {
        setLoading(false); // Met fin à l'état de chargement
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
