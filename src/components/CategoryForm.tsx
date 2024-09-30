import { CategorySchema } from '@/models/categorySchemas';
import { Category } from '@/models/categoryTypes';
import { logFormErrors } from '@/utils/errorUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
        <label>Nom de la catégorie:</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default CategoryForm;
