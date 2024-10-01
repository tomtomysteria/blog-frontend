import { z } from 'zod';
import {
  ArticleFormValuesSchema,
  ArticleSchema,
  ResponseArticleSchema,
} from './articleSchemas';

export type Article = z.infer<typeof ArticleSchema>;
export type ArticleFormValues = z.infer<typeof ArticleFormValuesSchema>;
export type ResponseArticle = z.infer<typeof ResponseArticleSchema>;
