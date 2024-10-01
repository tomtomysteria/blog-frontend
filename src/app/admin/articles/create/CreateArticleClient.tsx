'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createArticle } from '@/services/resources/articleService';
import ArticleForm from '@/components/ArticleForm';
import { ResponseUser } from '@/models/userTypes';
import { ResponseCategory } from '@/models/categoryTypes';
import { ArticleFormValues } from '@/models/articleTypes';
import { SubmitHandler } from 'react-hook-form';
import { handleError } from '@/utils/errorUtils';

type CreateArticleClientProps = {
  authors: ResponseUser[];
  categories: ResponseCategory[];
};

const CreateArticleClient: React.FC<CreateArticleClientProps> = ({
  authors,
  categories,
}) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<ArticleFormValues> = async (
    data: ArticleFormValues,
  ) => {
    try {
      await createArticle(data);
      router.push('/admin/articles');
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      throw handleError(error);
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
