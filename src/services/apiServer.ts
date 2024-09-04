import axios from 'axios';
import { getStoredItem } from '../utils/cookiesUtils.server';

export const createApiServer = (withAuth: boolean = true) => {
  const apiServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Assure que les cookies sont envoyés avec les requêtes côté serveur
  });

  if (withAuth) {
    apiServer.interceptors.request.use((config) => {
      const token = getStoredItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Ajoute le token au header Authorization
      } else {
        console.warn('No token found in cookies in server side');
      }
      return config;
    });
  }

  return apiServer;
};
