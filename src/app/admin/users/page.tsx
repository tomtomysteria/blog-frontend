import { fetchUsers } from '@/services/userService';
import UserList from '@/components/UserList';

const UserListPage = async () => {
  const users = await fetchUsers();

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mt-6">Liste des utilisateurs</h2>
      <UserList users={users} isAdmin={true} />
    </div>
  );
};

export default UserListPage;
