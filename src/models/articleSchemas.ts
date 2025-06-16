import { z } from 'zod';
import { ResponseUserSchema } from './userSchemas';
import { ResponseCategorySchema } from './categorySchemas';

const BaseArticleSchema = z
  .object({
    title: z.string().min(1, 'Le titre est requis'),
    content: z.string().min(1, 'Le contenu est requis'),
  })
  .strip();

export const ArticleSchema = BaseArticleSchema.extend({
  author: ResponseUserSchema,
  category: ResponseCategorySchema,
});

export const ArticleFormValuesSchema = BaseArticleSchema.extend({
  authorId: z.string().min(1, "L'auteur est requis"),
  categoryId: z.string().min(1, 'La catégorie est requise'),
});

export const ResponseArticleSchema = ArticleSchema.extend({
  id: z.string(),
}).passthrough();
