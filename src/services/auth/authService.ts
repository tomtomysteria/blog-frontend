import { createApiClient } from '../apiClient';
import { handleAxiosError } from '@/utils/errorUtils';

export const loginUser = async (identifier: string, password: string) => {
  try {
    const apiClient = createApiClient(false);

    const response = await apiClient.post('/auth/login', {
      identifier,
      password,
    });

    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
