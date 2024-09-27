import { z } from 'zod';

// Schéma Zod pour valider la structure des données utilisateurs
const UserSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  username: z.string().min(1, 'Username is required'),
  role: z.enum(['blogger', 'admin', 'super-admin']),
  birthdate: z.string().optional().nullable(),
});

// Schéma pour la création d'utilisateur avec "password"
export const CreateUserSchema = UserSchema.extend({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character',
    ),
}).strict(); // Validation stricte de l'ensemble des propriétés de UserSchema et CreateUserSchema qui l'étend

// Tous les champs sont optionnels, mais si 'password' est présent, il doit respecter certaines règles
export const UpdateUserSchema = UserSchema.extend({
  id: z.string(),
  password: z
    .string()
    .optional() // Password est optionnel mais doit suivre les contraintes si fourni
    .refine((val) => val === undefined || val === '' || val.length >= 8, {
      message: 'Password must be at least 8 characters long if provided',
    }) // Validation conditionnelle : ne valide le mot de passe que s'il est fourni et qu'il a une longueur d'au moins 8
    .refine((val) => {
      return (
        val === undefined ||
        val === '' ||
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          val,
        )
      );
    }, 'Password must include uppercase, lowercase, number, and special character'), // Validation du regex si le mot de passe est présent
}).strict(); // Validation stricte à l'envoi

export const ResponseUserSchema = UserSchema.extend({
  id: z.string(),
});
