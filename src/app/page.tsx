import { fetchArticles } from '@/services/resources/articleService';
import ArticleList from '@/components/ArticleList';

const Home = async () => {
  const articles = await fetchArticles();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold">Articles</h1>
      <ArticleList articles={articles} />
    </div>
  );
};

export default Home;
