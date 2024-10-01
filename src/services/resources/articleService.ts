'use server';

import { handleError, handleErrorLog } from '@/utils/errorUtils';
import { apiClient } from '../api-client/backend';
import { z } from 'zod';
import { ArticleFormValues, ResponseArticle } from '@/models/articleTypes';
import {
  ArticleFormValuesSchema,
  ResponseArticleSchema,
} from '@/models/articleSchemas';

// Fonction pour créer un article
export const createArticle = async (
  articleData: ArticleFormValues,
): Promise<ResponseArticle> => {
  try {
    const parsedData = ArticleFormValuesSchema.parse(articleData);
    const res = await apiClient.post<ResponseArticle>('/articles', parsedData);
    return ResponseArticleSchema.parse(res.data);
  } catch (error) {
    throw handleError(error);
  }
};

// Fonction pour mettre à jour un article
export const updateArticle = async (
  id: string,
  articleData: Partial<ArticleFormValues>,
): Promise<ResponseArticle> => {
  try {
    const parsedData = ArticleFormValuesSchema.parse(articleData);
    const res = await apiClient.put<ResponseArticle>(
      `/articles/${id}`,
      parsedData,
    );
    return ResponseArticleSchema.parse(res.data);
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
export const fetchArticles = async (): Promise<ResponseArticle[]> => {
  try {
    const res = await apiClient.get<ResponseArticle[]>('/articles');
    const parsedArticles = z.array(ResponseArticleSchema).parse(res.data);
    return parsedArticles;
  } catch (error) {
    handleErrorLog(error);
    return [];
  }
};

// Fonction pour récupérer un article par ID
export const fetchArticleById = async (
  id: string,
): Promise<ResponseArticle | null> => {
  try {
    const res = await apiClient.get<ResponseArticle>(`/articles/${id}`);
    return ResponseArticleSchema.parse(res.data);
  } catch (error) {
    handleErrorLog(error);
    return null;
  }
};
