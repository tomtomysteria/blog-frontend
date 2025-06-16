import React from 'react';
import { useRouter } from 'next/navigation';
import UserForm from '@/components/UserForm';
import { createUser } from '@/app/actions/resources/userService';

const RegisterComponent: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await createUser({ ...data, role: 'blogger' }); // Default role for public registration
      router.push('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return <UserForm onSubmit={onSubmit} isCreating={true} />;
};

export default RegisterComponent;
