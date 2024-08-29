import { Article } from '@/services/api';

type ArticleListProps = {
  articles: Article[];
  isAdmin?: boolean; // Optionnel : permet de savoir si on est dans le contexte admin
};

const ArticleList = ({ articles, isAdmin = false }: ArticleListProps) => {
  return (
    <ul>
      {articles.map(article => (
        <li key={article.id} className="mt-4">
          <h3 className="text-2xl">{article.title}</h3>
          <p>{article.content}</p>
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

export default ArticleList;
