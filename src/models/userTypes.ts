import { z } from 'zod';
import {
  CreateUserSchema,
  ResponseUserSchema,
  UpdateUserSchema,
} from './userSchemas';

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type ResponseUser = z.infer<typeof ResponseUserSchema>;
