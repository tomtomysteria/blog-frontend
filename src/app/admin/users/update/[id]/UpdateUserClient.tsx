'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/services/resources/userService';
import UserForm from '@/components/UserForm';

type UpdateUserClientProps = {
  user: { id: string; username: string; email: string };
};

const UpdateUserClient: React.FC<UpdateUserClientProps> = ({ user }) => {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await updateUser(user.id, data);
      router.push('/admin/users');
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return <UserForm initialData={user} onSubmit={onSubmit} />;
};

export default UpdateUserClient;
