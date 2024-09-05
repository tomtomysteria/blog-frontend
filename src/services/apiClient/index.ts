import { createApiClientCSR } from './apiClientCSR';
import { createApiClientSSR } from './apiClientSSR';

// Fonction pour créer un client API qui s'adapte au contexte (CSR ou SSR)
export const createApiClient = (withAuth: boolean = true) => {
  if (typeof window === 'undefined') {
    // On est côté serveur (SSR)
    return createApiClientSSR(withAuth);
  } else {
    // On est côté client (CSR)
    return createApiClientCSR(withAuth);
  }
};
