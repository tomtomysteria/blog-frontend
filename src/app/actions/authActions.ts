'use server';

import { setStoredItem } from '@/utils/cookiesUtils.server';
import { loginUser } from '@/services/authService';
import { AxiosError } from 'axios';

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
  } catch (error: AxiosError | any) {
    if (error.isAxiosError && error.response) {
      console.error('Login failed:', error.response.data);
    } else {
      console.error('Login failed:', error.message);
    }
    throw new Error(
      error.response?.data?.message ||
        'Login failed. Please check your credentials and try again.',
    );
  }
}
