import React from 'react';
import { fetchArticleById } from '@/services/api';
import UpdateArticleClient from './UpdateArticleClient';

export default async function UpdateArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await fetchArticleById(params.id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Article</h1>
      <UpdateArticleClient article={article} />
    </div>
  );
}
