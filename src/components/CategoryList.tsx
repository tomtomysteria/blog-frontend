'use client';

import { deleteCategory } from '@/app/actions/resources/categoryService';
import { ResponseCategory } from '@/models/categoryTypes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

interface CategoryListProps {
  categories: ResponseCategory[];
  isAdmin?: boolean;
}

const CategoryList = ({ categories, isAdmin = false }: CategoryListProps) => {
  const router = useRouter();

  const handleUpdate = (id: string) => {
    // Redirect to the category update page
    router.push(`/admin/categories/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        alert('Category deleted successfully.');
        router.refresh(); // Refresh the page to update the list
      } catch (error) {
        alert('Failed to delete the category.');
      }
    }
  };

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id} className="mt-4">
          <h3 className="text-2xl">{category.name}</h3>
          {isAdmin && (
            <div>
              <Button
                onClick={() => handleUpdate(category.id)}
                className="bg-blue-600 hover:bg-blue-500 mr-2"
              >
                Modifier
              </Button>
              <Button
                onClick={() => handleDelete(category.id)}
                variant="destructive"
              >
                Supprimer
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
