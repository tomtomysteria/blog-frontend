import { AxiosError } from 'axios';
import { createApiClient } from './apiClient';

export const loginUser = async (identifier: string, password: string) => {
  try {
    const apiClient = createApiClient(false);

    const response = await apiClient.post('/auth/login', {
      identifier,
      password,
    });

    return response.data;
  } catch (error: AxiosError | any) {
    // Utilisation d'AxiosError pour un typage strict
    if (error.isAxiosError && error.response) {
      console.error('Failed to login:', error.response.data);
    } else {
      console.error('Failed to login:', error.message);
    }
    throw error; // Relancer l'erreur après l'avoir capturée
  }
};
