import React from 'react';
import { fetchUsers } from '@/services/userService';
import { fetchCategories } from '@/services/categoryService';
import CreateArticleClient from './CreateArticleClient';

export default async function CreateArticlePage() {
  const authors = await fetchUsers();
  const categories = await fetchCategories();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Article</h1>
      <CreateArticleClient authors={authors} categories={categories} />
    </div>
  );
}
