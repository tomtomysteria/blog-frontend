import { ResponseArticle } from '@/models/articleTypes';

type ArticleDetailProps = {
  article: ResponseArticle;
};

const ArticleDetail = ({ article }: ArticleDetailProps) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
