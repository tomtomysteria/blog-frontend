'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Vérification que nous sommes côté client après l'hydratation
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white mb-4">
      <div>
        <Link href="/">
          <span className="text-lg font-bold">Home</span>
        </Link>
      </div>
      <div>
        {isClient ? (
          accessToken ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link href="/login">
              <span className="text-lg">Login</span>
            </Link>
          )
        ) : (
          // Affiche un état de chargement avant que l'hydratation soit terminée
          <span>Loading...</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
