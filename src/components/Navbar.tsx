'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      {/* Lien unique pour le logo et le texte Home */}
      <Link href="/" className="flex items-center">
        <Image
          src="/images/logo.png" // Chemin vers l'image dans le dossier public
          alt="Logo"
          width={50} // Largeur de référence de l'image
          height={50} // Hauteur de référence de l'image
          priority // Priorité au chargement de l'image même si elle se trouve en dehors du viewport
          className="w-auto h-auto" // Laisse l'image s'ajuster tout en conservant le ratio
        />
        <span className="text-lg font-bold ml-2">Home</span>
      </Link>

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
