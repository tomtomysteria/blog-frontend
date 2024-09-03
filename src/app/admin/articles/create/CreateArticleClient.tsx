'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createArticle } from '@/services/articleService';
import ArticleForm from '@/components/ArticleForm';

type CreateArticleClientProps = {
  authors: { id: string; username: string }[];
  categories: { id: string; name: string }[];
};

const CreateArticleClient: React.FC<CreateArticleClientProps> = ({
  authors,
  categories,
}) => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createArticle(data);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <ArticleForm
      authors={authors}
      categories={categories}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateArticleClient;
