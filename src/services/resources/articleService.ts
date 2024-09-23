'use server';

import { handleError, handleErrorLog } from '@/utils/errorUtils';
import { apiClient } from '../api-client/backend';

export type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
};

// Fonction pour créer un article
export const createArticle = async (
  articleData: Omit<Article, 'id'>,
): Promise<Article> => {
  try {
    const res = await apiClient.post<Article>('/articles', articleData);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour mettre à jour un article
export const updateArticle = async (
  id: string,
  articleData: Partial<Article>,
): Promise<Article> => {
  try {
    const res = await apiClient.put<Article>(`/articles/${id}`, articleData);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour supprimer un article
export const deleteArticle = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/articles/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour récupérer tous les articles
export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const res = await apiClient.get<Article[]>('/articles');
    return res.data;
  } catch (error) {
    handleErrorLog(error);
    return [];
  }
};

// Fonction pour récupérer un article par ID
export const fetchArticleById = async (id: string): Promise<Article | null> => {
  try {
    const res = await apiClient.get<Article>(`/articles/${id}`);
    return res.data;
  } catch (error) {
    handleErrorLog(error);
    return null;
  }
};
