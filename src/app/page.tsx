import dynamic from 'next/dynamic';
import { fetchArticles } from '@/app/actions/resources/articleService';

// Charger dynamiquement le composant ArticleList
const ArticleList = dynamic(() => import('@/components/ArticleList'), {
  ssr: false, // Désactiver le rendu côté serveur
  loading: () => <p>Loading...</p>,
});

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
