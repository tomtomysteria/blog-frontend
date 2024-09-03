import { fetchArticleById } from '@/services/articleService';
import ArticleDetail from '@/components/ArticleDetail';

type ArticleDetailPageProps = {
  params: { id: string };
};

const ArticleDetailPage = async ({ params }: ArticleDetailPageProps) => {
  const article = await fetchArticleById(params.id);

  if (!article) {
    return <p>Article not found.</p>;
  }

  return <ArticleDetail article={article} />;
};

export default ArticleDetailPage;
