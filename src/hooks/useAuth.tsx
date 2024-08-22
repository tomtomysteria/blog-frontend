// hook non utilisé

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

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
      router.push('/admin');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return {
    user,
    login,
    logout,
  };
};
