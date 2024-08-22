"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const LoginRedirect = ({ username, password }: { username: string, password: string }) => {
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      await login({ username, password });
      router.push('/admin');
    };

    handleLogin();
  }, [login, router, username, password]);

  return null; // Pas besoin de rendre quoi que ce soit, la redirection est effectuée automatiquement
};

export default LoginRedirect;
