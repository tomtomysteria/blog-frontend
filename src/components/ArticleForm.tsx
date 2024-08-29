import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type ArticleFormProps = {
  onSubmit: SubmitHandler<FormValues>;
  initialData?: Partial<FormValues>;
};

type FormValues = {
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
};

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ defaultValues: initialData });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Titre:</label>
        <input {...register('title', { required: 'Le titre est requis' })} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <label>Contenu:</label>
        <textarea {...register('content', { required: 'Le contenu est requis' })} />
        {errors.content && <p>{errors.content.message}</p>}
      </div>
      <div>
        <label>ID de l'auteur:</label>
        <input {...register('authorId', { required: "L'ID de l'auteur est requis" })} />
        {errors.authorId && <p>{errors.authorId.message}</p>}
      </div>
      <div>
        <label>ID de la catégorie:</label>
        <input {...register('categoryId', { required: "L'ID de la catégorie est requis" })} />
        {errors.categoryId && <p>{errors.categoryId.message}</p>}
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default ArticleForm;
