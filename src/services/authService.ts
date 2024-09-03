import { createApiClient } from './apiClient';

export const loginUser = async (identifier: string, password: string) => {
  try {
    const apiClient = createApiClient(false); // Désactiver l'ajout automatique du token
    const response = await apiClient.post('/auth/login', {
      identifier,
      password,
    });
    return response.data; // Assuming the response contains the JWT token and user info
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};
