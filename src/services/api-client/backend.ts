import axios from 'axios';
import {
  getStoredItem,
  setStoredItemApiRoute,
} from '@/utils/cookiesUtils.server';
import { getNewAccessToken } from '../auth/tokenService';
import { baseURLBackend } from '../config';

let accessTokenMemory: string | null = null; // Stocke temporairement le token en mémoire

const createApiClient = (withAuth: boolean = true) => {
  const apiClient = axios.create({
    baseURL: baseURLBackend,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // Assure l'envoi des cookies
  });

  if (withAuth) {
    apiClient.interceptors.request.use(async (config) => {
      // Utiliser le token en mémoire ou depuis les cookies
      const token = accessTokenMemory || getStoredItem('accessToken');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Ajoute le token au header Authorization
      } else {
        console.warn('No token found for authorization');
      }
      return config;
    });

    // Intercepteur pour gérer les erreurs 401 (token expiré)
    apiClient.interceptors.response.use(
      (response) => response, // On passe les réponses valides directement
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true; // Évite les boucles infinies

          try {
            const refreshToken = getStoredItem('refreshToken');
            if (refreshToken) {
              // Obtenir un nouveau token avec le refresh token
              const { accessToken } = await getNewAccessToken(refreshToken);

              // Mettre à jour le cookie côté serveur
              setStoredItemApiRoute('accessToken', accessToken);

              // Mettre à jour le token en mémoire pour éviter de relire les cookies
              accessTokenMemory = accessToken;

              // Réessayer la requête avec le nouveau token
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return apiClient(originalRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  return apiClient;
};

export const apiClient = createApiClient();

export const apiClientWithoutAuth = createApiClient(false);
