import { apiClientWithoutAuth } from '../api-client/backend';
import { handleAxiosError } from '@/utils/errorUtils';

export const loginUser = async (identifier: string, password: string) => {
  try {
    const response = await apiClientWithoutAuth.post('/auth/login', {
      identifier,
      password,
    });

    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
