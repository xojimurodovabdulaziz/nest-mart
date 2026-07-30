import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import { getCategories } from "../../api/categories";
import { categoryIconMap } from "../../components/Header/categoryIcons";
import Reveal from "../../components/Reveal/Reveal";
import usePageTitle from "../../hooks/usePageTitle";
import "./Categories.css";

const Categories = () => {
  usePageTitle("Kategoriyalar");

  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res?.data?.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Layout>
      <div className="container categories-page">
        <h1>Kategoriyalar</h1>

        {isLoading && (
          <div className="categories-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="category-tile-skeleton" key={i}>
                <div className="skeleton-block category-skeleton-icon" />
                <div className="skeleton-block skeleton-line skeleton-line-wide" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && categories.length === 0 && (
          <p className="categories-status">Kategoriyalar topilmadi</p>
        )}

        {!isLoading && categories.length > 0 && (
          <div className="categories-grid">
            {categories.map((cat, i) => {
              const Icon = categoryIconMap[cat.slug] || Package;
              return (
                <Reveal key={cat.id} delay={(i % 4) * 60}>
                  <Link to={`/?category=${cat.slug}`} className="category-tile">
                    <span className="category-tile-icon">
                      <Icon size={26} />
                    </span>
                    <span className="category-tile-name">{cat.name}</span>
                    <span className="category-tile-count">{cat.products_count} mahsulot</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
