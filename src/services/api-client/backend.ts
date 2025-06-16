import axios from 'axios';
import { getNewAccessToken } from '../auth/tokenService';
import { baseURLBackend } from '../config';
import {
  getServerCookie,
  setServerCookieNextResponse,
} from '@/app/actions/cookiesActions';
import { SECRET_TOKEN } from '@/config/env';

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
      const token =
        accessTokenMemory ||
        (await getServerCookie('accessToken', SECRET_TOKEN));

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
            const refreshToken = await getServerCookie(
              'refreshToken',
              SECRET_TOKEN,
            );
            if (refreshToken) {
              // Obtenir un nouveau token avec le refresh token
              const { accessToken } = await getNewAccessToken(refreshToken);

              // Mettre à jour le cookie côté serveur
              await setServerCookieNextResponse(
                'accessToken',
                accessToken,
                SECRET_TOKEN,
              );

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
