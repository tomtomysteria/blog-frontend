'use server';

import { handleError, handleErrorLog } from '@/utils/errorUtils';
import { apiClient } from '../api-client/backend';
import { z } from 'zod';
import { Category, ResponseCategory } from '@/models/categoryTypes';
import {
  CategorySchema,
  ResponseCategorySchema,
} from '@/models/categorySchemas';

// Fonction pour créer une catégorie
export const createCategory = async (
  categoryData: Category,
): Promise<ResponseCategory> => {
  try {
    const parsedData = CategorySchema.parse(categoryData);
    const res = await apiClient.post<Category>('/categories', parsedData);
    return ResponseCategorySchema.parse(res.data);
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour mettre à jour une catégorie
export const updateCategory = async (
  id: string,
  categoryData: Partial<Category>,
): Promise<ResponseCategory> => {
  try {
    const parsedData = CategorySchema.parse(categoryData);
    const res = await apiClient.put<Category>(`/categories/${id}`, parsedData);
    return ResponseCategorySchema.parse(res.data);
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
export const fetchCategories = async (): Promise<ResponseCategory[]> => {
  try {
    const res = await apiClient.get<ResponseCategory[]>('/categories');
    const parsedCategories = z.array(ResponseCategorySchema).parse(res.data);
    return parsedCategories;
  } catch (error) {
    handleErrorLog(error);
    return [];
  }
};

// Fonction pour récupérer une catégorie par ID
export const fetchCategoryById = async (
  id: string,
): Promise<ResponseCategory | null> => {
  try {
    const res = await apiClient.get<ResponseCategory>(`/categories/${id}`);
    return ResponseCategorySchema.parse(res.data);
  } catch (error) {
    handleErrorLog(error);
    return null;
  }
};
