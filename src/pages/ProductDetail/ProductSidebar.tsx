import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api/categories";
import { getProducts } from "../../api/products";
import { categoryIconMap } from "../../components/Header/categoryIcons";
import { Package } from "lucide-react";
import PriceFilter from "./PriceFilter";
import "./ProductSidebar.css";

const ProductSidebar = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [newProducts, setNewProducts] = useState<any[]>([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res?.data?.categories || []))
      .catch(() => setCategories([]));

    getProducts({ page: 1, limit: 3, sort: "created_at" })
      .then((res) => setNewProducts(res?.data?.products || []))
      .catch(() => setNewProducts([]));
  }, []);

  return (
    <aside className="product-sidebar">
      <div className="sidebar-block">
        <h3>Category</h3>
        <ul className="sidebar-category-list">
          {categories.map((cat) => {
            const Icon = categoryIconMap[cat.slug] || Package;
            return (
              <li key={cat.id}>
                <Link to={`/?category=${cat.slug}`}>
                  <Icon size={16} />
                  <span>{cat.name}</span>
                  <span className="sidebar-count">{cat.products_count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <PriceFilter />

      <div className="sidebar-block">
        <h3>New products</h3>
        <ul className="sidebar-new-list">
          {newProducts.map((p) => (
            <li key={p.id}>
              <Link to={`/product/${p.id}`}>
                <img src={p.main_image} alt={p.name} />
                <div>
                  <p className="sidebar-new-name">{p.name}</p>
                  <p className="sidebar-new-price">${p.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ProductSidebar;
