'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';
import { createArticle } from '@/services/api';

const CreateArticle: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await createArticle(data);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Article</h1>
      <ArticleForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateArticle;
