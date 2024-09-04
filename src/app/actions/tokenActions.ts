'use server';

import { getStoredItem, setStoredItem } from '@/utils/cookiesUtils.server';
import { getNewAccessToken } from '@/services/tokenService';
import { AxiosError } from 'axios';

export async function refreshToken(): Promise<{
  accessToken: string;
  refreshToken: string | null;
}> {
  const refreshToken = getStoredItem('refreshToken');

  console.log('Attempting to refresh token.');
  console.log('Refresh Token from cookies:', refreshToken);

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const { accessToken, newRefreshToken } =
      await getNewAccessToken(refreshToken);

    // Mettre à jour les cookies avec les nouveaux tokens
    setStoredItem('accessToken', accessToken);

    if (newRefreshToken) {
      setStoredItem('refreshToken', newRefreshToken);
    }

    return { accessToken, refreshToken: newRefreshToken || refreshToken };
  } catch (error: AxiosError | any) {
    // Typage avec AxiosError et type générique any
    if (error.isAxiosError && error.response) {
      console.error('Token refresh failed:', error.response.data);
    } else {
      console.error('Token refresh failed:', error.message);
    }
    throw error; // Relancer l'erreur après capture
  }
}
