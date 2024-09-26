'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Category, updateCategory } from '@/services/resources/categoryService';
import CategoryForm from '@/components/CategoryForm';

type UpdateCategoryClientProps = {
  category: Category;
};

const UpdateCategoryClient: React.FC<UpdateCategoryClientProps> = ({
  category,
}) => {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await updateCategory(category.id, data);
      router.push('/admin/categories'); // Redirection vers la liste des catégories
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  return <CategoryForm initialData={category} onSubmit={onSubmit} />;
};

export default UpdateCategoryClient;
