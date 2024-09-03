import React from 'react';
import { fetchCategoryById } from '@/services/categoryService';
import UpdateCategoryClient from './UpdateCategoryClient';

export default async function UpdateCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await fetchCategoryById(params.id);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Category</h1>
      <UpdateCategoryClient category={category} />
    </div>
  );
}
