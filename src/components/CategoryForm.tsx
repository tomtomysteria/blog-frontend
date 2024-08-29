import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type CategoryFormProps = {
  onSubmit: SubmitHandler<FormValues>;
  initialData?: Partial<FormValues>;
};

type FormValues = {
  name: string;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: initialData });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nom de la catégorie:</label>
        <input
          {...register('name', {
            required: 'Le nom de la catégorie est requis',
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default CategoryForm;
