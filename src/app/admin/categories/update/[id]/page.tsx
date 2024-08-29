'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchCategoryById, updateCategory } from '@/services/api';
import CategoryForm from '@/components/CategoryForm';
import { getSingleId } from '@/utils/identifierUtils';

const UpdateCategoryPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getCategory = async () => {
      try {
        const categoryId = getSingleId(id);
        const categoryData = await fetchCategoryById(categoryId);
        if (categoryData) {
          setCategory(categoryData);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        console.error('Failed to fetch category:', err);
        setError('Failed to load category data');
      }
    };

    getCategory();
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      const categoryId = getSingleId(id);
      await updateCategory(categoryId, data);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to update category:', error);
      setError('Failed to update category');
    }
  };

  if (error) {
    return <div className="container mx-auto p-4">{error}</div>;
  }

  if (!category) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mt-6">Mettre à jour la catégorie</h2>
      <CategoryForm onSubmit={onSubmit} initialData={category} />
    </div>
  );
};

export default UpdateCategoryPage;
