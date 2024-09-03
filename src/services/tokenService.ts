import { AxiosInstance } from 'axios';
import { createApiClient } from './apiClient';
import { getStoredItem, setStoredItem } from '../utils/localStorageUtils';

export async function getNewAccessToken(refreshToken: string) {
  const response = await createApiClient(false).post('/auth/refresh-token', {
    refreshToken,
  });
  return response.data;
}

export function setupTokenInterceptors(apiClient: AxiosInstance) {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getStoredItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token available, please log in again.');
        }

        const newTokens = await getNewAccessToken(refreshToken);
        setStoredItem('accessToken', newTokens.accessToken);
        setStoredItem('refreshToken', newTokens.refreshToken);
        originalRequest.headers['Authorization'] =
          `Bearer ${newTokens.accessToken}`;
        return apiClient(originalRequest);
      }
      return Promise.reject(error);
    },
  );
}
