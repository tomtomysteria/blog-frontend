import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateUserFromFrontOfficeSchema,
  CreateUserSchema,
  UpdateUserSchema,
} from '@/models/userSchemas';
import { User } from '@/models/userTypes';
import { logFormErrors } from '@/utils/errorUtils';

type UserFormProps = {
  onSubmit: SubmitHandler<User>;
  initialData?: Partial<User>;
  isAdmin?: boolean; // Flag to determine if roles should be selectable
  isCreating?: boolean; // Flag to determine if it's a creation or an update
};

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
  isAdmin = false,
  isCreating = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // getValues,
  } = useForm<User>({
    resolver: zodResolver(
      isCreating
        ? isAdmin
          ? CreateUserSchema
          : CreateUserFromFrontOfficeSchema
        : UpdateUserSchema,
    ), // Utilisation de Zod pour la validation
    defaultValues: initialData,
  });

  // Plus nécessaire puisque la transformation est traitée dans le backend
  // const handleFormSubmit: SubmitHandler<User> = (data: User) => {
  //   const values = getValues();

  //   // Set birthdate to null if it's an empty string
  //   if (!values.birthdate) {
  //     values.birthdate = null;
  //   }

  //   onSubmit(values as any);
  // };

  // Permet d'afficher les éventuelles erreurs retournés par zod à la soumission du formulaire
  logFormErrors(errors);

  return (
    // Utiliser handleFormSubmit à la place de onSubmit directement pour transformer les données si besoin
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name:</label>
        <input {...register('firstname')} />
        {errors.firstname && <p>{errors.firstname.message}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input {...register('lastname')} />
        {errors.lastname && <p>{errors.lastname.message}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input {...register('email', {})} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Username:</label>
        <input {...register('username')} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Mot de passe"
          {...register('password')}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Birthdate:</label>
        <input type="date" {...register('birthdate')} />
      </div>
      {isAdmin && (
        <div>
          <label>Role:</label>
          <select {...register('role', { required: true })}>
            <option value="blogger">Blogger</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
