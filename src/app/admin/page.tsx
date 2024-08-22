import { fetchArticles } from '../../services/api';
import ArticleList from '../../components/ArticleList';

const AdminHome = async () => {
  const articles = await fetchArticles();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <ArticleList articles={articles} isAdmin={true} />
    </div>
  );
};

export default AdminHome;
