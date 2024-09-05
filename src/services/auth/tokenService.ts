import { createApiClient } from '../apiClient';
import { handleAxiosError } from '@/utils/errorUtils';

export async function getNewAccessToken(refreshToken: string) {
  try {
    const response = await createApiClient(false).post('/auth/refresh-token', {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
