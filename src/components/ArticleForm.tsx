import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Editor from '@/components/Editor';
import { ResponseUser } from '@/models/userTypes';
import { ResponseCategory } from '@/models/categoryTypes';
import { Article, ArticleFormValues } from '@/models/articleTypes';
import { formHasErrors, logFormErrors } from '@/utils/errorUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArticleFormValuesSchema } from '@/models/articleSchemas';
import { cleanHtmlContent } from '@/utils/textUtils';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import SelectCustom from './SelectCustom';
import { Alert } from './ui/alert';
import ErrorAlert from './ErrorAlert';

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
        <Label>Titre:</Label>
        <Input {...register('title')} />
        {errors.title && (
          <Alert variant="noBorder">{errors.title.message}</Alert>
        )}
      </div>
      <div className="mt-5">
        <Label>Contenu:</Label>
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
        {errors.content && (
          <Alert variant="noBorder">{errors.content.message}</Alert>
        )}
      </div>
      <div className="mt-5">
        <Label>Auteur:</Label>
        <SelectCustom
          name="authorId"
          control={control}
          context="Sélectionnez un auteur"
          items={authors}
          getItemValue={(author) => author.id}
          getItemLabel={(author) => author.username}
        />
        {errors.authorId && (
          <Alert variant="noBorder">{errors.authorId.message}</Alert>
        )}
      </div>
      <div className="mt-5">
        <Label>Catégorie:</Label>
        <SelectCustom
          name="categoryId"
          control={control}
          context="Sélectionnez une catégorie"
          items={categories}
          getItemValue={(category) => category.id}
          getItemLabel={(category) => category.name}
        />
        {errors.categoryId && (
          <Alert variant="noBorder">{errors.categoryId.message}</Alert>
        )}
      </div>

      {formHasErrors(errors) && <ErrorAlert />}

      <Button type="submit" className="mt-10">
        Enregistrer
      </Button>
    </form>
  );
};

export default ArticleForm;
