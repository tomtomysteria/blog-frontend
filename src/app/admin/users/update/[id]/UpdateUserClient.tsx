'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/services/resources/userService';
import UserForm from '@/components/UserForm';
import { ResponseUser, UpdateUser } from '@/models/userTypes';
import { SubmitHandler } from 'react-hook-form';
import { handleError } from '@/utils/errorUtils';

type UpdateUserClientProps = {
  user: ResponseUser;
};

const UpdateUserClient: React.FC<UpdateUserClientProps> = ({ user }) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<UpdateUser> = async (data: UpdateUser) => {
    try {
      await updateUser(user.id, data);
      router.push('/admin/users');
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      throw handleError(error);
    }
  };

  return <UserForm initialData={user} onSubmit={onSubmit} isAdmin={true} />;
};

export default UpdateUserClient;
