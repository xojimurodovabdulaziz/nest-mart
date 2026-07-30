import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, User, Tag as TagIcon } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import { ARTICLES } from "./blogData";
import { useBlogComments } from "./useComments";
import "./BlogPost.css";
import usePageTitle from "../../hooks/usePageTitle";

const BlogPost = () => {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);
  const { comments, addComment } = useBlogComments(slug || "");
  usePageTitle(article?.title || "Blog");

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  if (!article) return <Navigate to="/blog" replace />;

  const related = ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    addComment(name.trim(), text.trim());
    setName("");
    setText("");
  };

  return (
    <Layout hideNewsletter>
      <div className="container blog-post-page">
        <Link to="/blog" className="blog-post-back">
          ← Blogga qaytish
        </Link>

        <span className="blog-post-category">{article.category}</span>
        <h1>{article.title}</h1>

        <div className="blog-post-meta">
          <span>
            <User size={13} /> {article.author}
          </span>
          <span>
            <Clock size={13} /> {article.readTime}
          </span>
          <span>{new Date(article.date).toLocaleDateString("uz-UZ")}</span>
        </div>

        <img src={article.image} alt={article.title} className="blog-post-hero" />

        <div className="blog-post-content">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="blog-post-tags">
          {article.tags.map((tag) => (
            <span key={tag} className="blog-post-tag">
              <TagIcon size={11} /> {tag}
            </span>
          ))}
        </div>

        {related.length > 0 && (
          <div className="blog-post-related">
            <h2>O'xshash maqolalar</h2>
            <div className="blog-post-related-grid">
              {related.map((r) => (
                <Link to={`/blog/${r.slug}`} key={r.slug} className="blog-post-related-card">
                  <img src={r.image} alt={r.title} />
                  <p>{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="blog-post-comments">
          <h2>Fikrlar ({comments.length})</h2>

          {comments.length === 0 && (
            <p className="blog-post-no-comments">Hozircha fikr yo'q — birinchi bo'lib yozing!</p>
          )}

          {comments.map((c) => (
            <div className="blog-comment" key={c.id}>
              <div className="blog-comment-avatar">{c.name.charAt(0).toUpperCase()}</div>
              <div>
                <p className="blog-comment-name">
                  {c.name} <span>{c.date}</span>
                </p>
                <p className="blog-comment-text">{c.text}</p>
              </div>
            </div>
          ))}

          <form className="blog-comment-form" onSubmit={handleSubmit}>
            <h3>Fikr qoldirish</h3>
            <input
              placeholder="Ismingiz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Fikringiz..."
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <button type="submit">Yuborish</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
