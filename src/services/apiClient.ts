import axios from 'axios';
import { getStoredItem } from '../utils/localStorageUtils';
import { getCookie } from 'cookies-next';

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
      let token = getStoredItem('accessToken');
      if (!token) {
        token = getCookie('accessToken') as string | null; // Fall back to cookies if token is not in localStorage
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('No token found in localStorage or cookies');
      }
      return config;
    });
  }

  return apiClient;
};
