'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateArticle } from '@/services/resources/articleService';
import ArticleForm from '@/components/ArticleForm';
import { fetchCategories } from '@/services/resources/categoryService';
import { fetchUsers } from '@/services/resources/userService';
import { ResponseUser } from '@/models/userTypes';
import { ResponseCategory } from '@/models/categoryTypes';
import { SubmitHandler } from 'react-hook-form';
import { ArticleSchema } from '@/models/articleSchemas';
import { ArticleFormValues, ResponseArticle } from '@/models/articleTypes';

type UpdateArticleClientProps = {
  article: ResponseArticle;
};

const UpdateArticleClient: React.FC<UpdateArticleClientProps> = ({
  article,
}) => {
  const router = useRouter();
  const [authors, setAuthors] = useState<ResponseUser[]>([]);
  const [categories, setCategories] = useState<ResponseCategory[]>([]);

  // Récupérer les auteurs et catégories lors du montage du composant
  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedAuthors, fetchedCategories] = await Promise.all([
          fetchUsers(),
          fetchCategories(),
        ]);
        setAuthors(fetchedAuthors);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch authors or categories:', error);
      }
    }
    loadData();
  }, []);

  const onSubmit: SubmitHandler<ArticleFormValues> = async (
    data: ArticleFormValues,
  ) => {
    try {
      await updateArticle(article.id, data);
      router.push('/admin/articles');
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      console.error('Failed to update article:', error);
    }
  };

  const parsedData = ArticleSchema.parse(article);
  return (
    <ArticleForm
      initialData={parsedData}
      onSubmit={onSubmit}
      authors={authors}
      categories={categories}
    />
  );
};

export default UpdateArticleClient;
