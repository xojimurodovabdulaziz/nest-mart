import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useCompare } from "../../context/CompareContext";
import ProductCardSkeleton from "../../components/ProductCard/ProductCardSkeleton";
import Reveal from "../../components/Reveal/Reveal";
import "./Compare.css";
import usePageTitle from "../../hooks/usePageTitle";

const Compare = () => {
  usePageTitle("Taqqoslash");

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const { items, isLoading, refreshCompare, toggleCompare } = useCompare();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    refreshCompare();
  }, [token, navigate, refreshCompare]);

  if (!token) return null;

  return (
    <Layout>
      <div className="container compare-page">
        <h1>Compare products</h1>

        {isLoading && (
          <div className="compare-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="compare-empty">
            <p>You have no products to compare yet</p>
            <Link to="/">Browse products</Link>
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <div className="compare-grid">
            {items.map((item, i) => (
              <Reveal key={item.product_id} delay={(i % 4) * 60}>
                <div className="compare-card">
                  <button
                    className="compare-remove"
                    onClick={() => toggleCompare(item.product_id).catch(() => {})}
                  >
                    ✕
                  </button>
                  <img src={item.product.main_image} alt={item.product.name} loading="lazy" decoding="async" />
                  <p className="compare-name">{item.product.name}</p>
                  <p className="compare-price">${item.product.price}</p>
                  <Link to={`/product/${item.product_id}`} className="compare-view-link">
                    View product
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Compare;
