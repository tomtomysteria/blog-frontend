'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchArticleById, updateArticle } from '@/services/api';
import ArticleForm from '@/components/ArticleForm';
import { getSingleId } from '@/utils/idUtils';

const UpdateArticlePage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getArticle = async () => {
      try {
        const articleId = getSingleId(id);
        const articleData = await fetchArticleById(articleId);
        if (articleData) {
          setArticle(articleData);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setError('Failed to load article data');
      }
    };

    getArticle();
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      const articleId = getSingleId(id);
      await updateArticle(articleId, data);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to update article:', error);
      setError('Failed to update article');
    }
  };

  if (error) {
    return <div className="container mx-auto p-4">{error}</div>;
  }

  if (!article) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mt-6">Mettre à jour l'article</h2>
      <ArticleForm onSubmit={onSubmit} initialData={article} />
    </div>
  );
};

export default UpdateArticlePage;
