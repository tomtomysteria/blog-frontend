'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import UserForm from '@/components/UserForm';
import { createUser } from '@/services/resources/userService';

const CreateUser: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await createUser(data);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New User</h1>
      <UserForm onSubmit={onSubmit} isAdmin />
    </div>
  );
};

export default CreateUser;
