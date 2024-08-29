import { User } from '@/services/api';

type UserListProps = {
  users: User[];
  isAdmin?: boolean; // Optionnel : permet de savoir si on est dans le contexte admin
};

const UserList = ({ users, isAdmin = false }: UserListProps) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} className="mt-4">
          <h3 className="text-2xl">{user.username}</h3>
          <p>{user.email}</p>
          {isAdmin && (
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
