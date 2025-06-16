// Fonction utilitaire pour accéder à localStorage en vérifiant si l'on est côté client
export const getStoredItem = (key: string): string | null => {
  return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
};

// Fonction utilitaire pour enregistrer un item dans localStorage côté client
export const setStoredItem = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

// Fonction utilitaire pour supprimer un item dans localStorage côté client
export const removeStoredItem = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
