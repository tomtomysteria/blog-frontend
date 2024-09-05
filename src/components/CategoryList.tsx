'use client';

import { deleteCategory } from '@/services/resources/categoryService';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
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
              <button onClick={() => handleUpdate(category.id)}>Edit</button>
              <button onClick={() => handleDelete(category.id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
