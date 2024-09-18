import { apiClientWithoutAuth } from '../api-client/backend';
import { handleAxiosError } from '@/utils/errorUtils';

export async function getNewAccessToken(refreshToken: string) {
  try {
    const response = await apiClientWithoutAuth.post('/auth/refresh-token', {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
