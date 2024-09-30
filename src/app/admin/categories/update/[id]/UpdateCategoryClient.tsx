'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { updateCategory } from '@/services/resources/categoryService';
import CategoryForm from '@/components/CategoryForm';
import { Category, ResponseCategory } from '@/models/categoryTypes';
import { SubmitHandler } from 'react-hook-form';
import { handleError } from '@/utils/errorUtils';
import { CategorySchema } from '@/models/categorySchemas';

type UpdateCategoryClientProps = {
  category: ResponseCategory;
};

const UpdateCategoryClient: React.FC<UpdateCategoryClientProps> = ({
  category,
}) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<Category> = async (data: Category) => {
    try {
      await updateCategory(category.id, data);
      router.push('/admin/categories'); // Redirection vers la liste des catégories
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      throw handleError(error);
    }
  };

  const parsedData = CategorySchema.parse(category);
  return <CategoryForm initialData={parsedData} onSubmit={onSubmit} />;
};

export default UpdateCategoryClient;
