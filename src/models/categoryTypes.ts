import { z } from 'zod';
import { CategorySchema, ResponseCategorySchema } from './categorySchemas';

export type Category = z.infer<typeof CategorySchema>;
export type ResponseCategory = z.infer<typeof ResponseCategorySchema>;
