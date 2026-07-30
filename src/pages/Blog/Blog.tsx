import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import { ARTICLES, CATEGORIES, GALLERY_IMAGES, POPULAR_TAGS } from "./blogData";
import "./Blog.css";
import usePageTitle from "../../hooks/usePageTitle";

const Blog = () => {
  usePageTitle("Blog");

  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = ARTICLES.filter((a) => {
    if (activeCategory !== "Barchasi" && a.category !== activeCategory) return false;
    if (activeTag && !a.tags.includes(activeTag)) return false;
    return true;
  });

  const trending = ARTICLES.slice(0, 3);

  return (
    <Layout hideNewsletter>
      <div className="container blog-page">
        <div className="blog-header">
          <h1>Blog & News</h1>
          <div className="blog-category-tabs">
            {CATEGORIES.map((c) => (
              <button
                type="button"
                key={c}
                className={`blog-tab ${activeCategory === c ? "active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-layout">
          <div className="blog-main">
            <h2 className="blog-section-title">Retsept maqolalari</h2>

            {filtered.length === 0 && (
              <p className="blog-empty">Bu bo'limda hozircha maqola yo'q</p>
            )}

            <div className="blog-grid">
              {filtered.map((article) => (
                <Link to={`/blog/${article.slug}`} className="blog-card" key={article.slug}>
                  <div className="blog-card-image">
                    <img src={article.image} alt={article.title} loading="lazy" decoding="async" />
                    <span className="blog-card-category">{article.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>
                        <User size={12} /> {article.author}
                      </span>
                      <span>
                        <Clock size={12} /> {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="blog-sidebar">
            <div className="blog-sidebar-block">
              <h3>Trend maqolalar</h3>
              {trending.map((article) => (
                <Link to={`/blog/${article.slug}`} className="blog-trending-row" key={article.slug}>
                  <img src={article.image} alt={article.title} loading="lazy" decoding="async" />
                  <span>{article.title}</span>
                </Link>
              ))}
            </div>

            <div className="blog-sidebar-block">
              <h3>Galereya</h3>
              <div className="blog-gallery-grid">
                {GALLERY_IMAGES.map((src) => (
                  <img src={src} alt="" key={src} loading="lazy" decoding="async" />
                ))}
              </div>
            </div>

            <div className="blog-sidebar-block">
              <h3>Ommabop teglar</h3>
              <div className="blog-tags-cloud">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className={`blog-tag-chip ${activeTag === tag ? "active" : ""}`}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
