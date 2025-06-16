import { CategorySchema } from '@/models/categorySchemas';
import { Category } from '@/models/categoryTypes';
import { formHasErrors, logFormErrors } from '@/utils/errorUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Alert } from './ui/alert';
import ErrorAlert from './ErrorAlert';

type CategoryFormProps = {
  onSubmit: SubmitHandler<Category>;
  initialData?: Partial<Category>;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData,
  });

  logFormErrors(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Nom de la catégorie:</Label>
        <Input {...register('name')} />
        {errors.name && <Alert variant="noBorder">{errors.name.message}</Alert>}
      </div>
      <div className="mt-5">
        <Label>Description de la catégorie:</Label>
        <Textarea
          {...register('description')}
          placeholder="Description facultative"
        />
        {errors.description && (
          <Alert variant="noBorder">{errors.description.message}</Alert>
        )}
      </div>

      {formHasErrors(errors) && <ErrorAlert />}

      <Button type="submit" className="mt-10">
        Enregistrer
      </Button>
    </form>
  );
};

export default CategoryForm;
