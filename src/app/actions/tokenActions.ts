'use server';

import { getNewAccessToken } from '@/services/auth/tokenService';
import { handleError } from '@/utils/errorUtils';
import { getServerCookie, setServerCookie } from './cookiesActions';
import { SECRET_TOKEN } from '@/config/env';

export async function refreshTokens(): Promise<{
  accessToken: string;
  refreshToken: string | null;
}> {
  try {
    // Récupérer le refreshToken à partir des cookies
    const refreshToken = await getServerCookie('refreshToken', SECRET_TOKEN);

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    // Obtenir de nouveaux tokens à partir du refreshToken existant
    const { accessToken, newRefreshToken } =
      await getNewAccessToken(refreshToken);

    // Mettre à jour le cookie `accessToken`
    await setServerCookie('accessToken', accessToken, SECRET_TOKEN);

    // Si un nouveau refreshToken est fourni, mettre à jour le cookie `refreshToken`
    if (newRefreshToken) {
      await setServerCookie('refreshToken', newRefreshToken, SECRET_TOKEN);
    }

    // Retourne les nouveaux tokens
    return { accessToken, refreshToken: newRefreshToken || refreshToken };
  } catch (error) {
    throw handleError(error);
  }
}
