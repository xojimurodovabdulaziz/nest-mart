import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useWishlist } from "../../context/WishlistContext";
import ProductCardSkeleton from "../../components/ProductCard/ProductCardSkeleton";
import Reveal from "../../components/Reveal/Reveal";
import "./Wishlist.css";
import usePageTitle from "../../hooks/usePageTitle";

const Wishlist = () => {
  usePageTitle("Sevimlilar");

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const { items, isLoading, refreshWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    refreshWishlist();
  }, [token, navigate, refreshWishlist]);

  if (!token) return null;

  return (
    <Layout>
      <div className="container wishlist-page">
        <h1>Sevimlilar</h1>

        {isLoading && (
          <div className="wishlist-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="wishlist-empty">
            <p>Sevimlilar ro'yxati bo'sh</p>
            <Link to="/" className="wishlist-empty-link">
              Xarid qilishni boshlash
            </Link>
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <div className="wishlist-grid">
            {items.map((item, i) => (
              <Reveal key={item.product_id} delay={(i % 4) * 60}>
                <div className="wishlist-card">
                  <Link to={`/product/${item.product_id}`}>
                    <img src={item.product.main_image} alt={item.product.name} loading="lazy" decoding="async" />
                    <p className="wishlist-name">{item.product.name}</p>
                    <p className="wishlist-price">${item.product.price}</p>
                  </Link>
                  <button
                    className="wishlist-remove"
                    onClick={() => toggleWishlist(item.product_id).catch(() => {})}
                  >
                    Olib tashlash
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
