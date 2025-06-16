import { z } from 'zod';

// Constantes pour les messages d'erreur liés au mot de passe
const errorMessages = {
  invalidPasswordLength:
    "Le mot de passe doit être composé d'au moins 8 caractères",
  invalidPasswordPattern:
    "Le mot de passe doit être composé d'au moins un caractère minuscule et majuscule, d'un caractère spécial et d'un chiffre",
  requiredRole: 'Le rôle est requis',
};

// Regex pour valider le mot de passe
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const UserSchema = z
  .object({
    firstname: z.string().min(1, 'Le prénom est requis'),
    lastname: z.string().min(1, 'Le nom est requis'),
    email: z
      .string()
      .min(1, "L'adresse e-mail est requise")
      .email('Adresse e-mail invalide'),
    username: z.string().min(1, "L'identifiant est requis"),
    role: z
      .enum(['blogger', 'admin', 'super-admin', ''], {
        required_error: errorMessages.requiredRole,
      })
      .refine((value) => value !== '', {
        message: errorMessages.requiredRole,
      }),
    birthdate: z.string().optional().nullable(),
  })
  .strip();

export const CreateUserSchema = UserSchema.extend({
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(8, errorMessages.invalidPasswordLength)
    .regex(passwordRegex, errorMessages.invalidPasswordPattern),
});

export const CreateUserFromFrontOfficeSchema = CreateUserSchema.omit({
  role: true,
});

// Tous les champs sont optionnels, mais si 'password' est présent, il doit respecter certaines règles
export const UpdateUserSchema = UserSchema.extend({
  password: z
    .string()
    .optional() // Password est optionnel mais doit suivre les contraintes si fourni
    .refine((val) => val === undefined || val === '' || val.length >= 8, {
      message: errorMessages.invalidPasswordLength,
    }) // Validation conditionnelle : ne valide le mot de passe que s'il est fourni et qu'il a une longueur d'au moins 8
    .refine((val) => {
      return val === undefined || val === '' || passwordRegex.test(val);
    }, errorMessages.invalidPasswordPattern), // Validation du regex si le mot de passe est présent
});

export const ResponseUserSchema = UserSchema.extend({
  id: z.string(),
}).passthrough();
