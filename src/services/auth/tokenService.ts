import { apiClientWithoutAuth } from '../api-client/backend';
import { handleError } from '@/utils/errorUtils';

export async function getNewAccessToken(refreshToken: string) {
  try {
    const response = await apiClientWithoutAuth.post('/auth/refresh-token', {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}
