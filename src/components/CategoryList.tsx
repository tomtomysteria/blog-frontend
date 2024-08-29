import { Category } from '@/services/api';

type CategoryListProps = {
  categories: Category[];
  isAdmin?: boolean; // Optionnel : permet de savoir si on est dans le contexte admin
};

const CategoryList = ({ categories, isAdmin = false }: CategoryListProps) => {
  return (
    <ul>
      {categories.map(category => (
        <li key={category.id} className="mt-4">
          <h3 className="text-2xl">{category.name}</h3>
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

export default CategoryList;
