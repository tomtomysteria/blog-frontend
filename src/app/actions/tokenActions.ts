'use server';

import { getStoredItem, setStoredItem } from '@/utils/cookiesUtils.server';
import { getNewAccessToken } from '@/services/auth/tokenService';
import { handleAxiosError } from '@/utils/errorUtils';

export async function refreshToken(): Promise<{
  accessToken: string;
  refreshToken: string | null;
}> {
  const refreshToken = getStoredItem('refreshToken');

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
  } catch (error) {
    throw handleAxiosError(error);
  }
}
