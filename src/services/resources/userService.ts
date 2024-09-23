'use server';

import { apiClient } from '../api-client/backend';
import { handleError, handleErrorLog } from '@/utils/errorUtils';

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
    const res = await apiClient.post<User>('/users', userData);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (
  id: string,
  userData: Partial<User>,
): Promise<User> => {
  try {
    const res = await apiClient.put<User>(`/users/${id}`, userData);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/users/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour récupérer tous les utilisateurs
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await apiClient.get<User[]>('/users');
    return res.data;
  } catch (error) {
    handleErrorLog(error);
    return [];
  }
};

// Fonction pour récupérer un utilisateur par ID
export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    const res = await apiClient.get<User>(`/users/${id}`);
    return res.data;
  } catch (error) {
    handleErrorLog(error);
    return null;
  }
};
