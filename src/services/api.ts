import { createApiClient } from './apiClient';
import { setupTokenInterceptors } from './tokenService';
import * as ArticleService from './articleService';
import * as CategoryService from './categoryService';
import * as UserService from './userService';
import * as AuthService from './authService';

const apiClient = createApiClient(true);
setupTokenInterceptors(apiClient);

export { apiClient, ArticleService, CategoryService, UserService, AuthService };
