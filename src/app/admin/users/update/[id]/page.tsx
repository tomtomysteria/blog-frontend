import React from 'react';
import { fetchUserById } from '@/services/resources/userService';
import UpdateUserClient from './UpdateUserClient';

export default async function UpdateUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await fetchUserById(params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <UpdateUserClient user={user} />
    </div>
  );
}
