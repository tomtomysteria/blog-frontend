import { fetchCategories } from '@/services/api';
import CategoryList from '@/components/CategoryList';

const CategoryListPage = async () => {
  const categories = await fetchCategories();

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mt-6">Liste des catégories</h2>
      <CategoryList categories={categories} isAdmin={true} />
    </div>
  );
};

export default CategoryListPage;
