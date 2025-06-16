'use client';

import dynamic from 'next/dynamic';

// Charger dynamiquement le composant LoginComponent
const LoginComponent = dynamic(() => import('./LoginComponent'), {
  ssr: false, // Désactiver le rendu côté serveur
  loading: () => <p>Loading...</p>,
});

const LoginPage = () => {
  return <LoginComponent />;
};

export default LoginPage;
