'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CategoryForm from '@/components/CategoryForm';
import { createCategory } from '@/services/resources/categoryService';
import { Category } from '@/models/categoryTypes';
import { SubmitHandler } from 'react-hook-form';
import { handleError } from '@/utils/errorUtils';

const CreateCategoryClient: React.FC = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<Category> = async (data: Category) => {
    try {
      await createCategory(data);
      router.push('/admin/categories'); // Redirection vers la liste des catégories
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      throw handleError(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Category</h1>
      <CategoryForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateCategoryClient;
