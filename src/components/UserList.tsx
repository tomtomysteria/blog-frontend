'use client';

import { deleteUser } from '@/app/actions/resources/userService';
import { useRouter } from 'next/navigation';
import React from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserListProps {
  users: User[];
  isAdmin?: boolean;
}

const UserList = ({ users, isAdmin = false }: UserListProps) => {
  const router = useRouter();

  const handleUpdate = (id: string) => {
    // Redirect to the user update page
    router.push(`/admin/users/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        alert('User deleted successfully.');
        router.refresh(); // Refresh the page to update the list
      } catch (error) {
        alert('Failed to delete the user.');
      }
    }
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="mt-4">
          <h3 className="text-2xl">{user.username}</h3>
          <p>{user.email}</p>
          {isAdmin && (
            <div>
              <button onClick={() => handleUpdate(user.id)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
