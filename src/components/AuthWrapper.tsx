'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized, role } = useAuth() || {};

  useEffect(() => {
    if (role && typeof isAuthorized === 'function') {
      if (
        !isAuthorized('admin') &&
        typeof window !== 'undefined' &&
        window.location.pathname.startsWith('/admin')
      ) {
        window.location.href = '/';
      }

      if (
        !isAuthorized('super-admin') &&
        typeof window !== 'undefined' &&
        window.location.pathname.startsWith('/super-admin')
      ) {
        window.location.href = '/';
      }
    }
  }, [isAuthorized, role]);

  return <>{children}</>;
}
