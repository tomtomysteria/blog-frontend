'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import UserForm from '@/components/UserForm';
import { createUser } from '@/services/resources/userService';
import { handleError } from '@/utils/errorUtils';
import { SubmitHandler } from 'react-hook-form';
import { User } from '@/models/userTypes';

const CreateUserClient: React.FC = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    try {
      await createUser(data);
      router.push('/admin/users');
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      throw handleError(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New User</h1>
      <UserForm onSubmit={onSubmit} isAdmin={true} isCreating={true} />
    </div>
  );
};

export default CreateUserClient;
