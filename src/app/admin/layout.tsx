'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthorized, role } = useAuth() || {};
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (role && typeof isAuthorized === 'function') {
      if (!isAuthorized('super-admin') && !isAuthorized('admin')) {
        router.push('/'); // Redirection si l'utilisateur n'a pas les droits admin
      } else {
        setLoading(false); // Fin du chargement si l'utilisateur est autorisé
      }
    }
  }, [isAuthorized, role, router]);

  if (loading) {
    return <div>Loading...</div>; // Affiche un écran de chargement pendant la vérification des droits
  }

  return (
    <div>
      <header>
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        {/* Ici, tu peux ajouter une barre de navigation pour l'admin, etc. */}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
