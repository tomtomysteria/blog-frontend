'use server';

import { createApiClient } from '../apiClient';

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  role: string;
  birthdate?: string;
};

// Fonction pour créer un utilisateur
export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  try {
    const apiClient = createApiClient();
    const response = await apiClient.post<User>('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (
  id: string,
  userData: Partial<User>,
): Promise<User> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.put<User>(`/users/${id}`, userData);
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw error;
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (id: string): Promise<void> => {
  try {
    const apiClient = createApiClient();
    await apiClient.delete(`/users/${id}`);
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de l'utilisateur ${id}:`,
      error,
    );
    throw error;
  }
};

// Fonction pour récupérer tous les utilisateurs
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.get<User[]>('/users');
    return res.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return [];
  }
};

// Fonction pour récupérer un utilisateur par ID
export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.get<User>(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'utilisateur ${id}:`,
      error,
    );
    return null;
  }
};
