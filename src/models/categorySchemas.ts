import { z } from 'zod';

export const CategorySchema = z
  .object({
    name: z.string().min(1, 'Le nom de la catégorie est requis'),
  })
  .strip();

export const ResponseCategorySchema = CategorySchema.extend({
  id: z.string(),
}).passthrough();
