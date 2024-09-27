'use server';

import { CreateUser, ResponseUser, UpdateUser } from '@/models/userTypes';
import { apiClient } from '../api-client/backend';
import { handleError, handleErrorLog } from '@/utils/errorUtils';
import {
  CreateUserSchema,
  ResponseUserSchema,
  UpdateUserSchema,
} from '@/models/userSchemas';
import { z } from 'zod';

// Fonction pour créer un utilisateur
export const createUser = async (
  userData: CreateUser,
): Promise<ResponseUser> => {
  try {
    // Validation et nettoyage des données avant l'envoi
    const parsedData = CreateUserSchema.parse(userData);
    const res = await apiClient.post<CreateUser>('/users', parsedData);
    // Validation de la réponse avec Zod
    return ResponseUserSchema.parse(res.data);
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (
  id: string,
  userData: Partial<UpdateUser>,
): Promise<ResponseUser> => {
  try {
    const parsedData = UpdateUserSchema.parse(userData);
    const res = await apiClient.put<UpdateUser>(`/users/${id}`, parsedData);
    return ResponseUserSchema.parse(res.data);
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
export const fetchUsers = async (): Promise<ResponseUser[]> => {
  try {
    const res = await apiClient.get<ResponseUser[]>('/users');
    // Valider les données reçues comme un tableau d'objets ResponseUser
    const parsedUsers = z.array(ResponseUserSchema).parse(res.data);
    return parsedUsers;
  } catch (error) {
    handleErrorLog(error);
    return [];
  }
};

// Fonction pour récupérer un utilisateur par ID
export const fetchUserById = async (
  id: string,
): Promise<ResponseUser | null> => {
  try {
    const res = await apiClient.get<ResponseUser>(`/users/${id}`);
    return ResponseUserSchema.parse(res.data);
  } catch (error) {
    handleErrorLog(error);
    return null;
  }
};
