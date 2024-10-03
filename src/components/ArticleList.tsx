'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML
import { deleteArticle } from '@/app/actions/resources/articleService';
import { Button } from './ui/button';
import { ResponseArticle } from '@/models/articleTypes';

interface ArticleListProps {
  articles: ResponseArticle[];
  isAdmin?: boolean;
}

const ArticleList = ({ articles, isAdmin = false }: ArticleListProps) => {
  const router = useRouter();

  const handleUpdate = (id: string) => {
    // Redirect to the article update page
    router.push(`/admin/articles/update/${id}`);
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
          {/* Nettoyer et afficher le contenu HTML sécurisé */}
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.content),
            }}
          />
          {isAdmin && (
            <div className="mt-2">
              <Button
                onClick={() => handleUpdate(article.id)}
                className="bg-blue-600 hover:bg-blue-500 mr-2"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(article.id)}
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
