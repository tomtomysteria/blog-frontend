'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/services/resources/userService';
import UserForm from '@/components/UserForm';
import { ResponseUser, User } from '@/models/userTypes';
import { SubmitHandler } from 'react-hook-form';
import { handleError } from '@/utils/errorUtils';
import { UpdateUserSchema } from '@/models/userSchemas';

type UpdateUserClientProps = {
  user: ResponseUser;
};

const UpdateUserClient: React.FC<UpdateUserClientProps> = ({ user }) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    try {
      await updateUser(user.id, data);
      router.push('/admin/users');
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      throw handleError(error);
    }
  };

  const parsedData = UpdateUserSchema.parse(user);
  return (
    <UserForm initialData={parsedData} onSubmit={onSubmit} isAdmin={true} />
  );
};

export default UpdateUserClient;
