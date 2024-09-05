import { fetchArticles } from '@/services/resources/articleService';
import ArticleList from '@/components/ArticleList';

const ArticleListPage = async () => {
  const articles = await fetchArticles();

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold">Liste des articles</h2>
      <ArticleList articles={articles} isAdmin={true} />
    </div>
  );
};

export default ArticleListPage;
