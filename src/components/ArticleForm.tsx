import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Editor from '@/components/Editor';
import { ResponseUser } from '@/models/userTypes';
import { ResponseCategory } from '@/models/categoryTypes';
import { Article, ArticleFormValues } from '@/models/articleTypes';
import { logFormErrors } from '@/utils/errorUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArticleFormValuesSchema } from '@/models/articleSchemas';
import { cleanHtmlContent } from '@/utils/textUtils';

type ArticleFormProps = {
  onSubmit: SubmitHandler<ArticleFormValues>;
  authors: ResponseUser[];
  categories: ResponseCategory[];
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
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(ArticleFormValuesSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      authorId: initialData?.author?.id || '',
      categoryId: initialData?.category?.id || '',
    },
  });

  logFormErrors(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Titre:</label>
        <input {...register('title')} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div className="my-5">
        <label>Contenu:</label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Editor
              content={cleanHtmlContent(field.value)}
              onContentChange={field.onChange}
            />
          )}
        />
        {errors.content && <p>{errors.content.message}</p>}
      </div>
      <div>
        <label>Auteur:</label>
        <Controller
          name="authorId"
          control={control}
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
        {errors.authorId && <p>{errors.authorId.message}</p>}
      </div>
      <div>
        <label>Catégorie:</label>
        <Controller
          name="categoryId"
          control={control}
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
        {errors.categoryId && <p>{errors.categoryId.message}</p>}
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default ArticleForm;
