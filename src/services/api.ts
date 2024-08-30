import axios from 'axios';

// Créer une instance Axios avec un interceptor pour ajouter le token JWT
export const createApiClient = (withAuth: boolean = true) => {
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  // Ajouter un interceptor pour inclure le token JWT dans l'en-tête Authorization, sauf si withAuth est false
  if (withAuth) {
    apiClient.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refreshToken');

          if (!refreshToken) {
            throw new Error('No refresh token available, please log in again.');
          }

          const newTokens = await getNewAccessToken(refreshToken);
          saveTokens(newTokens);
          originalRequest.headers['Authorization'] =
            `Bearer ${newTokens.accessToken}`;
          return apiClient(originalRequest);
        }
        return Promise.reject(error);
      },
    );
  }

  return apiClient;
};

async function getNewAccessToken(refreshToken: string) {
  const response = await createApiClient(false).post('/auth/refresh-token', {
    refreshToken,
  });
  return response.data;
}

function saveTokens(tokens: { accessToken: string; refreshToken: string }) {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
}

export type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
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

export const loginUser = async (identifier: string, password: string) => {
  try {
    const apiClient = createApiClient(false); // Désactiver l'ajout automatique du token
    const response = await apiClient.post('/auth/login', {
      identifier,
      password,
    });
    return response.data; // Assuming the response contains the JWT token and user info
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};
