'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article, updateArticle } from '@/services/resources/articleService';
import ArticleForm from '@/components/ArticleForm';
import {
  Category,
  fetchCategories,
} from '@/services/resources/categoryService';
import { fetchUsers, User } from '@/services/resources/userService';

type UpdateArticleClientProps = {
  article: Article;
};

const UpdateArticleClient: React.FC<UpdateArticleClientProps> = ({
  article,
}) => {
  const router = useRouter();
  const [authors, setAuthors] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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

  const onSubmit = async (data: any) => {
    try {
      await updateArticle(article.id, data);
      router.push('/admin/articles');
      router.refresh(); // Rafraîchissement pour assurer la mise à jour des données
    } catch (error) {
      console.error('Failed to update article:', error);
    }
  };

  return (
    <ArticleForm
      initialData={article}
      onSubmit={onSubmit}
      authors={authors}
      categories={categories}
    />
  );
};

export default UpdateArticleClient;
