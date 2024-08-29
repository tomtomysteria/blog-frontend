'use client';

import dynamic from 'next/dynamic';

// Charger dynamiquement le composant LoginComponent
const LoginComponent = dynamic(() => import('./LoginComponent'), {
  ssr: false, // Désactiver le rendu côté serveur
});

const LoginPage = () => {
  return <LoginComponent />;
};

export default LoginPage;
