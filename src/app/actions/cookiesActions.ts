'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SECRET_TOKEN } from '@/config/env';

const allowedCookies = ['accessToken', 'refreshToken', 'role'];

function cookieManipulationAllowedOrThrow(key: string, token: string) {
  if (!allowedCookies.includes(key) || token !== SECRET_TOKEN) {
    throw new Error('Unauthorized: Cookie manipulation is not allowed');
  }
}

function getCookieOptions(
  key: string,
  value: string,
  isHttpOnly: boolean = true,
) {
  return {
    name: key,
    value: value,
    path: '/',
    secure: process.env.NODE_ENV === 'production', // Utilise HTTPS en production
    httpOnly: isHttpOnly, // True pour empêcher l'accès via JavaScript côté client
    sameSite: 'strict' as 'strict', // Protection contre les attaques CSRF
  };
}

export async function setServerCookie(
  key: string,
  value: string,
  token: string,
) {
  cookieManipulationAllowedOrThrow(key, token);

  const cookieStore = cookies();

  cookieStore.set(getCookieOptions(key, value));
}

export const setServerCookieNextResponse = (
  key: string,
  value: string,
  token: string,
): NextResponse => {
  cookieManipulationAllowedOrThrow(key, token);

  const response = NextResponse.json({ success: true });

  response.cookies.set(getCookieOptions(key, value));

  return response;
};

export async function removeServerCookie(key: string, token: string) {
  cookieManipulationAllowedOrThrow(key, token);

  const cookieStore = cookies();

  cookieStore.set({
    name: key,
    value: '',
    path: '/',
    maxAge: -1, // Expire immédiatement le cookie
  });
}

export async function getServerCookie(
  key: string,
  token: string,
): Promise<string | null> {
  cookieManipulationAllowedOrThrow(key, token);
  const cookieStore = cookies();
  return cookieStore.get(key)?.value || null;
}
