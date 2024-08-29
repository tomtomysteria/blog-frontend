'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CategoryForm from '@/components/CategoryForm';
import { createCategory } from '@/services/api';

const CreateCategory: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await createCategory(data);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Category</h1>
      <CategoryForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateCategory;
