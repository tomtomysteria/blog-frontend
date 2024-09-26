'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createArticle } from '@/services/resources/articleService';
import ArticleForm from '@/components/ArticleForm';
import { User } from '@/services/resources/userService';
import { Category } from '@/services/resources/categoryService';

type CreateArticleClientProps = {
  authors: User[];
  categories: Category[];
};

const CreateArticleClient: React.FC<CreateArticleClientProps> = ({
  authors,
  categories,
}) => {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await createArticle(data);
      router.push('/admin/articles');
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <ArticleForm
      authors={authors}
      categories={categories}
      onSubmit={onSubmit}
    />
  );
};

export default CreateArticleClient;
