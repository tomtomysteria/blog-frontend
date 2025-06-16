import Cookies from 'js-cookie';

// Function to get a value from cookies (client-side)
export const getStoredItem = (key: string): string | null => {
  return Cookies.get(key) || null;
};

// Function to set a value in cookies (client-side)
export const setStoredItem = (key: string, value: string): void => {
  Cookies.set(key, value, { secure: true, sameSite: 'Strict' });
};

// Function to remove a value from cookies (client-side)
export const removeStoredItem = (key: string): void => {
  Cookies.remove(key);
};
