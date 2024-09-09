import dynamic from 'next/dynamic';
import { fetchArticles } from '@/services/resources/articleService';

// Charger dynamiquement le composant ArticleList
const ArticleList = dynamic(() => import('@/components/ArticleList'), {
  ssr: false, // Désactiver le rendu côté serveur
  loading: () => <p>Loading...</p>,
});

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
