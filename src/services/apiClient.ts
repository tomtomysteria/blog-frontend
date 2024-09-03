import axios from 'axios';
import { getStoredItem } from '../utils/localStorageUtils';

export const createApiClient = (withAuth: boolean = true) => {
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  if (withAuth) {
    apiClient.interceptors.request.use((config) => {
      const token = getStoredItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('No token found in localStorage');
      }
      return config;
    });
  }

  return apiClient;
};
