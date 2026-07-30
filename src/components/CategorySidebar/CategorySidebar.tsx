import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { getCategories } from "../../api/categories";
import { categoryIconMap } from "../Header/categoryIcons";
import "./CategorySidebar.css";

interface Props {
  activeCategory?: string;
  onSelect: (slug: string | undefined) => void;
}

const CategorySidebar = ({ activeCategory, onSelect }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories()
      .then((result) => setCategories(result?.data?.categories || []))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="sidebar-block category-sidebar">
      <h3>Category</h3>
      <ul>
        <li
          className={!activeCategory ? "active" : ""}
          onClick={() => onSelect(undefined)}
        >
          <span className="cat-name">All Categories</span>
        </li>
        {categories.map((cat) => {
          const Icon = categoryIconMap[cat.slug] || Package;
          return (
            <li
              key={cat.id}
              className={activeCategory === cat.slug ? "active" : ""}
              onClick={() => onSelect(cat.slug)}
            >
              <Icon size={18} className="cat-icon" />
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.products_count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySidebar;
