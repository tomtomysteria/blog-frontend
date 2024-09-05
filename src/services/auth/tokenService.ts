import { AxiosError } from 'axios';
import { createApiClient } from '../apiClient';

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
