import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Editor from '@/components/Editor';

type FormValues = {
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
};

type ArticleFormProps = {
  onSubmit: SubmitHandler<FormValues>;
  authors: { id: string; username: string }[];
  categories: { id: string; name: string }[];
  initialData?: Partial<FormValues>; // Ajout de initialData comme prop optionnelle
};

const ArticleForm: React.FC<ArticleFormProps> = ({
  onSubmit,
  authors,
  categories,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData, // Utilisation de initialData pour définir les valeurs par défaut
  });

  // Ajouter un état pour gérer le contenu de l'éditeur
  const [content, setContent] = useState<string>(initialData?.content || '');

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit({ ...data, content }); // Envoyer le contenu de l'éditeur avec le reste du formulaire
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Titre:</label>
        <input {...register('title', { required: 'Le titre est requis' })} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div className="my-5">
        <label>Contenu:</label>
        {/* Remplacer le textarea par l'éditeur Tiptap */}
        <Editor content={content} onContentChange={setContent} />
        {errors.content && <p>{errors.content.message}</p>}
      </div>
      <div>
        <label>Auteur:</label>
        <select {...register('authorId', { required: "L'auteur est requis" })}>
          <option value="">Sélectionnez un auteur</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.username}
            </option>
          ))}
        </select>
        {errors.authorId && <p>{errors.authorId.message}</p>}
      </div>
      <div>
        <label>Catégorie:</label>
        <select
          {...register('categoryId', { required: 'La catégorie est requise' })}
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p>{errors.categoryId.message}</p>}
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default ArticleForm;
