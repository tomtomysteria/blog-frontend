import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Function to get a value from cookies (server-side)
export const getStoredItem = (key: string): string | null => {
  const cookieStore = cookies();
  return cookieStore.get(key)?.value || null;
};

// Function to set a value in cookies for API Routes
export const setStoredItemApiRoute = (
  key: string,
  value: string,
): NextResponse => {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: key,
    value: value,
    path: '/',
    secure: process.env.NODE_ENV === 'production', // Utilise HTTPS en prod
    sameSite: 'strict', // Protection contre les attaques CSRF
    httpOnly: true, // False pour accéder au cookie côté client
  });

  return response;
};

// Function to remove a value from cookies for API Routes
export const removeStoredItemApiRoute = (key: string): NextResponse => {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: key,
    value: '',
    path: '/',
    maxAge: -1, // Expire immédiatement le cookie
  });

  return response;
};
