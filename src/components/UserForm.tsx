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
import { formHasErrors, logFormErrors } from '@/utils/errorUtils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import SelectCustom from './SelectCustom';
import { Alert } from './ui/alert';
import ErrorAlert from './ErrorAlert';
import DatePickerCustom from './DatePickerCustom';

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
    control,
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

  type Role = {
    value: string;
    label: string;
  };

  const roles: Role[] = [
    { value: 'blogger', label: 'Blogger' },
    { value: 'admin', label: 'Admin' },
    { value: 'super-admin', label: 'Super Admin' },
  ];

  return (
    // Utiliser handleFormSubmit à la place de onSubmit directement pour transformer les données si besoin
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Prénom:</Label>
        <Input {...register('firstname')} />
        {errors.firstname && (
          <Alert variant="noBorder">{errors.firstname.message}</Alert>
        )}
      </div>
      <div className="mt-5">
        <Label>Nom:</Label>
        <Input {...register('lastname')} />
        {errors.lastname && (
          <Alert variant="noBorder">{errors.lastname.message}</Alert>
        )}
      </div>
      <div className="mt-5">
        <Label>Adresse e-mail:</Label>
        <Input {...register('email', {})} />
        {errors.email && (
          <Alert variant="noBorder">{errors.email.message}</Alert>
        )}
      </div>
      <div className="mt-5">
        <Label>Identifiant:</Label>
        <Input {...register('username')} />
        {errors.username && (
          <Alert variant="noBorder">{errors.username.message}</Alert>
        )}
      </div>
      <div className="mt-5">
        <Label>Mot de passe:</Label>
        <Input
          type="password"
          placeholder="Mot de passe"
          {...register('password')}
        />
        {errors.password && (
          <Alert variant="noBorder">{errors.password.message}</Alert>
        )}
      </div>
      <div className="mt-5">
        <Label>Date de naissance:</Label>
        <DatePickerCustom name="birthdate" control={control} />
        {errors.birthdate && (
          <Alert variant="noBorder">{errors.birthdate.message}</Alert>
        )}
      </div>
      {isAdmin && (
        <div className="mt-5">
          <Label>Rôle:</Label>
          <SelectCustom
            name="role"
            control={control}
            context="Sélectionnez un rôle"
            items={roles}
            getItemValue={(role) => role.value}
            getItemLabel={(role) => role.label}
          />
          {errors.role && (
            <Alert variant="noBorder">{errors.role.message}</Alert>
          )}
        </div>
      )}

      {formHasErrors(errors) && <ErrorAlert />}

      <Button type="submit" className="mt-10">
        Enregistrer
      </Button>
    </form>
  );
};

export default UserForm;
