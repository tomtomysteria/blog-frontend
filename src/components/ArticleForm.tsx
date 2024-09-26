import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Editor from '@/components/Editor';
import { User } from '@/services/resources/userService';
import { Category } from '@/services/resources/categoryService';
import { Article } from '@/services/resources/articleService';

type FormValues = {
  title: string;
  content: string;
  author: string;
  category: string;
};

type ArticleFormProps = {
  onSubmit: SubmitHandler<FormValues>;
  authors: User[];
  categories: Category[];
  initialData?: Partial<Article>;
};

const ArticleForm: React.FC<ArticleFormProps> = ({
  onSubmit,
  authors,
  categories,
  initialData,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      author: initialData?.author?.id || '', // Utilisation de l'ID de l'auteur
      category: initialData?.category?.id || '', // Utilisation de l'ID de la catégorie
    },
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
        <Controller
          name="author"
          control={control}
          rules={{ required: "L'auteur est requis" }}
          render={({ field }) => (
            <select {...field}>
              <option value="">Sélectionnez un auteur</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.username}
                </option>
              ))}
            </select>
          )}
        />
        {errors.author && <p>{errors.author.message}</p>}
      </div>
      <div>
        <label>Catégorie:</label>
        <Controller
          name="category"
          control={control}
          rules={{ required: 'La catégorie est requise' }}
          render={({ field }) => (
            <select {...field}>
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.category && <p>{errors.category.message}</p>}
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default ArticleForm;
