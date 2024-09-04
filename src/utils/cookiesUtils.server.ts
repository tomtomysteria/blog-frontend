import { cookies } from 'next/headers';

// Function to get a value from cookies (server-side)
export const getStoredItem = (key: string): string | null => {
  const cookieStore = cookies();
  return cookieStore.get(key)?.value || null;
};

// Function to set a value in cookies (server-side)
export const setStoredItem = (key: string, value: string): void => {
  cookies().set({
    name: key,
    value: value,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

// Function to remove a value from cookies (server-side)
export const removeStoredItem = (key: string): void => {
  cookies().set({
    name: key,
    value: '',
    path: '/',
    maxAge: -1, // Expire the cookie immediately
  });
};
