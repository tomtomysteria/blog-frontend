'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { updateArticle } from '@/services/articleService';
import ArticleForm from '@/components/ArticleForm';

type UpdateArticleClientProps = {
  article: {
    id: string;
    title: string;
    content: string;
    authorId: string;
    categoryId: string;
  };
};

const UpdateArticleClient: React.FC<UpdateArticleClientProps> = ({
  article,
}) => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await updateArticle(article.id, data);
      router.push('/admin/articles');
    } catch (error) {
      console.error('Failed to update article:', error);
    }
  };

  return (
    <ArticleForm
      initialData={article}
      onSubmit={handleSubmit}
      authors={[{ id: article.authorId, username: 'Author' }]}
      categories={[{ id: article.categoryId, name: 'Category' }]}
    />
  );
};

export default UpdateArticleClient;
