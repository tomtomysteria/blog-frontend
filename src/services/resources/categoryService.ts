'use server';

import { handleError, handleErrorLog } from '@/utils/errorUtils';
import { apiClient } from '../api-client/backend';

export type Category = {
  id: string;
  name: string;
};

// Fonction pour créer une catégorie
export const createCategory = async (
  categoryData: Omit<Category, 'id'>,
): Promise<Category> => {
  try {
    const res = await apiClient.post<Category>('/categories', categoryData);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour mettre à jour une catégorie
export const updateCategory = async (
  id: string,
  categoryData: Partial<Category>,
): Promise<Category> => {
  try {
    const res = await apiClient.put<Category>(
      `/categories/${id}`,
      categoryData,
    );
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour supprimer une catégorie
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/categories/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour récupérer toutes les catégories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await apiClient.get<Category[]>('/categories');
    return res.data;
  } catch (error) {
    handleErrorLog(error);
    return [];
  }
};

// Fonction pour récupérer une catégorie par ID
export const fetchCategoryById = async (
  id: string,
): Promise<Category | null> => {
  try {
    const res = await apiClient.get<Category>(`/categories/${id}`);
    return res.data;
  } catch (error) {
    handleErrorLog(error);
    return null;
  }
};
