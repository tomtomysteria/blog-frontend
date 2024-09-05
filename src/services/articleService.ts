'use server';

import { createApiClient } from './apiClient';

export type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
};

// Fonction pour récupérer tous les articles
export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.get<Article[]>('/articles');
    return res.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
};

// Fonction pour récupérer un article par ID
export const fetchArticleById = async (id: string): Promise<Article | null> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.get<Article>(`/articles/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${id}:`, error);
    return null;
  }
};

// Fonction pour créer un article
export const createArticle = async (
  articleData: Omit<Article, 'id'>,
): Promise<Article> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.post<Article>('/articles', articleData);
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    throw error;
  }
};

// Fonction pour mettre à jour un article
export const updateArticle = async (
  id: string,
  articleData: Partial<Article>,
): Promise<Article> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.put<Article>(`/articles/${id}`, articleData);
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article:", error);
    throw error;
  }
};

// Fonction pour supprimer un article
export const deleteArticle = async (id: string): Promise<void> => {
  try {
    const apiClient = createApiClient();
    await apiClient.delete(`/articles/${id}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'article ${id}:`, error);
    throw error;
  }
};
