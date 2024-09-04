import axios from 'axios';

export const createBaseApiClient = (
  getStoredItem: (key: string) => string | null,
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
  }

  return apiClient;
};
