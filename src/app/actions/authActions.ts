'use server';

import { loginUser } from '@/services/auth/authService';
import { handleError } from '@/utils/errorUtils';

export async function login(identifier: string, password: string) {
  try {
    const { accessToken, refreshToken, role } = await loginUser(
      identifier,
      password,
    );

    return { accessToken, refreshToken, role };
  } catch (error) {
    throw handleError(error);
  }
}
