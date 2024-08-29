'use client';

import { deleteArticle } from '../services/api';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
}

interface ArticleListProps {
  articles: Article[];
  isAdmin?: boolean;
}

const ArticleList = ({ articles, isAdmin = false }: ArticleListProps) => {
  const router = useRouter();

  const handleUpdate = (id: string) => {
    // Redirect to the article update page
    router.push(`/admin/update/articles/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(id);
        alert('Article deleted successfully.');
        router.refresh(); // Refresh the page to update the list
      } catch (error) {
        alert('Failed to delete the article.');
      }
    }
  };

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id} className="mt-4">
          <h3 className="text-2xl">{article.title}</h3>
          <p>{article.content}</p>
          {isAdmin && (
            <div>
              <button onClick={() => handleUpdate(article.id)}>Edit</button>
              <button onClick={() => handleDelete(article.id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
