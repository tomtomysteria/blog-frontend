import axios from 'axios';

export const loginUser = async (identifier: string, password: string) => {
  try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { identifier, password });
      return response.data; // Assuming the response contains the JWT token and user info
  } catch (error) {
      console.error('Failed to login:', error);
      throw error;
  }
};

export type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
};

// Créer une instance Axios avec un interceptor pour ajouter le token JWT
export const createApiClient = () => {
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Inclure les credentials dans les requêtes
  });

  // Ajouter un interceptor pour inclure le token JWT dans l'en-tête Authorization
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return apiClient;
};

// Exemple d'utilisation de cette instance pour une requête
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
export const createArticle = async (articleData: Omit<Article, 'id'>): Promise<Article> => {
  try {
    const apiClient = createApiClient();
    const res = await apiClient.post<Article>('/articles', articleData);
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    throw error;
  }
};


