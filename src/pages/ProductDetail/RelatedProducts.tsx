import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";
import Reveal from "../../components/Reveal/Reveal";
import "./RelatedProducts.css";

interface Props {
  categorySlug?: string;
  excludeId: string;
}

const RelatedProducts = ({ categorySlug, excludeId }: Props) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    getProducts({ category: categorySlug, page: 1, limit: 4 })
      .then((res) => {
        const list = (res?.data?.products || []).filter((p: any) => p.id !== excludeId);
        setProducts(list);
      })
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, [categorySlug, excludeId]);

  if (!isLoading && products.length === 0) return null;

  return (
    <div className="related-products">
      <h2>O'xshash mahsulotlar</h2>
      <div className="related-grid">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div className="related-card-skeleton" key={i}>
                <div className="skeleton-block related-skeleton-image" />
                <div className="skeleton-block skeleton-line skeleton-line-wide" />
                <div className="skeleton-block skeleton-line" style={{ width: "40%" }} />
              </div>
            ))
          : products.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 60}>
                <Link to={`/product/${p.id}`} className="related-card">
                  <img src={p.main_image} alt={p.name} loading="lazy" decoding="async" />
                  <p className="related-name">{p.name}</p>
                  <p className="related-price">${p.price}</p>
                </Link>
              </Reveal>
            ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
