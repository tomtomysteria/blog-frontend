import { z } from 'zod';
import { CreateUserSchema, ResponseUserSchema } from './userSchemas';

export type User = z.infer<typeof CreateUserSchema>;
export type ResponseUser = z.infer<typeof ResponseUserSchema>;
