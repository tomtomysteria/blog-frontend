import { AxiosInstance, AxiosError } from 'axios';
import { createApiClient } from './apiClient';
import { getStoredItem, setStoredItem } from '../utils/cookiesUtils.client';

export async function getNewAccessToken(refreshToken: string) {
  try {
    const response = await createApiClient(false).post('/auth/refresh-token', {
      refreshToken,
    });
    return response.data;
  } catch (error: AxiosError | any) {
    if (error.isAxiosError && error.response) {
      console.error('Failed to refresh token:', error.response.data);
    } else {
      console.error('Failed to refresh token:', error.message);
    }
    throw error;
  }
}

export function setupTokenInterceptors(apiClient: AxiosInstance) {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError | any) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        let refreshToken = getStoredItem('refreshToken');

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
