import { createApiClient } from './apiClient';

export type Category = {
  id: string;
  name: string;
};

// Fonction pour créer une catégorie
export const createCategory = async (
  categoryData: Omit<Category, 'id'>,
): Promise<Category> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.post<Category>('/categories', categoryData);
    return res.data;
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    throw error;
  }
};

// Fonction pour mettre à jour une catégorie
export const updateCategory = async (
  id: string,
  categoryData: Partial<Category>,
): Promise<Category> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.put<Category>(
      `/categories/${id}`,
      categoryData,
    );
    return res.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    throw error;
  }
};

// Fonction pour supprimer une catégorie
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const apiClient = createApiClient();
    await apiClient.delete(`/categories/${id}`);
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de la catégorie ${id}:`,
      error,
    );
    throw error;
  }
};

// Fonction pour récupérer toutes les catégories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.get<Category[]>('/categories');
    return res.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
};

// Fonction pour récupérer une catégorie par ID
export const fetchCategoryById = async (
  id: string,
): Promise<Category | null> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.get<Category>(`/categories/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la catégorie ${id}:`,
      error,
    );
    return null;
  }
};
