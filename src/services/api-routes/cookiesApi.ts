import { apiClient } from '../api-client/frontend';

// Fonction pour récupérer un cookie via l'API Route
export const getServerCookieApiRoute = async (
  key: string,
): Promise<string | null> => {
  try {
    const response = await apiClient.get(`/api/cookies/get?key=${key}`);
    return response.data.value;
  } catch (error) {
    console.error('Error fetching cookie from API:', error);
    return null;
  }
};

// Fonction pour définir un cookie via l'API Route
export const setServerCookieApiRoute = async (
  key: string,
  value: string,
): Promise<void> => {
  try {
    await apiClient.post(`/api/cookies/set`, { key, value });
  } catch (error) {
    console.error('Error setting cookie via API:', error);
  }
};

// Fonction pour supprimer un cookie via l'API Route
export const removeServerCookieApiRoute = async (
  key: string,
): Promise<void> => {
  try {
    await apiClient.delete(`/api/cookies/delete?key=${key}`);
  } catch (error) {
    console.error('Error removing cookie via API:', error);
  }
};
