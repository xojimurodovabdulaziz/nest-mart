import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../api/products";
import "./Deals.css";
import usePageTitle from "../../hooks/usePageTitle";

const Deals = () => {
  usePageTitle("Chegirmalar");

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getProducts({ page: 1, limit: 50, sort: "price" })
      .then((res) => {
        const all = res?.data?.products || [];
        setProducts(all.filter((p: any) => p.discount_percent > 0));
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Layout>
      <div className="container deals-page">
        <h1>Deals of the Day</h1>
        <p className="deals-subtitle">Grab these limited-time discounts before they're gone</p>

        {isLoading && <p className="deals-status">Loading...</p>}
        {error && <p className="deals-status deals-error">{error}</p>}
        {!isLoading && !error && products.length === 0 && (
          <p className="deals-status">No active deals right now</p>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="deals-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Deals;
