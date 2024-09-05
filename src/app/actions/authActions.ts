'use server';

import { setStoredItem } from '@/utils/cookiesUtils.server';
import { loginUser } from '@/services/auth/authService';
import { handleAxiosError } from '@/utils/errorUtils';

export async function login(identifier: string, password: string) {
  try {
    const { accessToken, refreshToken, role } = await loginUser(
      identifier,
      password,
    );

    setStoredItem('accessToken', accessToken);
    setStoredItem('refreshToken', refreshToken);
    setStoredItem('role', role);

    return { accessToken, refreshToken, role };
  } catch (error) {
    throw handleAxiosError(error);
  }
}
