'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createArticle } from '../../services/api';

type FormData = {
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
};

const CreateArticleForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      await createArticle(data);
      setMessage('Article créé avec succès !');
      reset();
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);
      setMessage("Échec de la création de l'article.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Créer un nouvel article</h1>
      
      {message && (
        <div
          className={`mb-4 p-4 text-sm ${
            message.includes('succès') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
          } rounded`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Titre */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Titre</label>
          <input
            type="text"
            {...register('title', { required: 'Le titre est requis' })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.title ? 'border-red-500' : ''
            }`}
          />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
        </div>

        {/* Contenu */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contenu</label>
          <textarea
            {...register('content', { required: 'Le contenu est requis' })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.content ? 'border-red-500' : ''
            }`}
            rows={5}
          />
          {errors.content && <p className="text-red-500 text-xs italic">{errors.content.message}</p>}
        </div>

        {/* Author ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">ID de lauteur</label>
          <input
            type="text"
            {...register('authorId', { required: "L'ID de l'auteur est requis" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.authorId ? 'border-red-500' : ''
            }`}
          />
          {errors.authorId && <p className="text-red-500 text-xs italic">{errors.authorId.message}</p>}
        </div>

        {/* Category ID */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">ID de la catégorie</label>
          <input
            type="text"
            {...register('categoryId', { required: 'L\'ID de la catégorie est requis' })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.categoryId ? 'border-red-500' : ''
            }`}
          />
          {errors.categoryId && <p className="text-red-500 text-xs italic">{errors.categoryId.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? 'Création en cours...' : 'Créer l\'article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticleForm;
