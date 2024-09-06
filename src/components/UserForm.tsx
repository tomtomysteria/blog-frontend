import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type UserFormProps = {
  onSubmit: SubmitHandler<FormValues>;
  initialData?: Partial<FormValues>;
  isAdmin?: boolean; // Flag to determine if roles should be selectable
};

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  role: string;
  birthdate: string | null; // Allow birthdate to be null
};

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
  isAdmin = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({ defaultValues: initialData });

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    const values = getValues();

    // Set birthdate to null if it's an empty string
    if (!values.birthdate) {
      values.birthdate = null;
    }

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>First Name:</label>
        <input
          {...register('firstname', { required: 'First name is required' })}
        />
        {errors.firstname && <p>{errors.firstname.message}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          {...register('lastname', { required: 'Last name is required' })}
        />
        {errors.lastname && <p>{errors.lastname.message}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Username:</label>
        <input
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                'Password must include uppercase, lowercase, number, and special character',
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Birthdate:</label>
        <input type="date" {...register('birthdate')} />
      </div>
      {isAdmin && (
        <div>
          <label>Role:</label>
          <select {...register('role', { required: true })}>
            <option value="blogger">Blogger</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
