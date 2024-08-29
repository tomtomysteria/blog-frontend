'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchUserById, updateUser } from '@/services/api';
import UserForm from '@/components/UserForm';
import { getSingleId } from '@/utils/identifierUtils';

const UpdateUserPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const userId = getSingleId(id);
        const userData = await fetchUserById(userId);
        if (userData) {
          setUser(userData);
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user data');
      }
    };

    getUser();
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      const userId = getSingleId(id);
      await updateUser(userId, data);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to update user:', error);
      setError('Failed to update user');
    }
  };

  if (error) {
    return <div className="container mx-auto p-4">{error}</div>;
  }

  if (!user) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mt-6">Mettre à jour l'utilisateur</h2>
      <UserForm onSubmit={onSubmit} defaultValues={user} />
    </div>
  );
};

export default UpdateUserPage;
