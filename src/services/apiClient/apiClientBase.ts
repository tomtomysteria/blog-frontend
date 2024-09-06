import axios from 'axios';
import { getNewAccessToken } from '../auth/tokenService';

export const createBaseApiClient = (
  getStoredItem: (key: string) => string | null,
  setStoredItem: (key: string, value: string) => void,
  withAuth: boolean = true,
) => {
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Assure l'envoi des cookies
  });

  if (withAuth) {
    apiClient.interceptors.request.use((config) => {
      const token = getStoredItem('accessToken');
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
              setStoredItem('accessToken', accessToken);

              // Réessayer la requête avec le nouveau token
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return apiClient(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token refresh failed', refreshError);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error); // Propager l'erreur si ce n'est pas un problème de token
      },
    );
  }

  return apiClient;
};
