"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

type AuthContextType = {
  user: any;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/me').then((response) => setUser(response.data));
    }
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:4000/auth/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
