import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { getCategories } from "../../api/categories";
import { categoryIconMap } from "./categoryIcons";
import "./CategoryDropdown.css";

interface Category {
  id: number | string;
  name: string;
  slug: string;
  products_count: number;
}

interface CategoryDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (slug: string) => void;
}

const CategoryDropdown = ({ isOpen, onClose, onSelect }: CategoryDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || categories.length > 0) return;

    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getCategories();
        setCategories(res?.data?.categories || []);
      } catch (err) {
        setError("Kategoriyalarni yuklab bo'lmadi");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [isOpen, categories.length]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="category-dropdown" ref={ref}>
      <div className="category-dropdown-header">Category</div>

      {isLoading && (
        <div className="category-dropdown-state">Yuklanmoqda...</div>
      )}

      {error && <div className="category-dropdown-state error">{error}</div>}

      {!isLoading && !error && (
        <ul className="category-dropdown-list">
          {categories.map((cat) => {
            const Icon = categoryIconMap[cat.slug] || Package;
            return (
              <li key={cat.id}>
                <Link
                  to={`/?category=${cat.slug}`}
                  className="category-dropdown-item"
                  onClick={() => {
                    onSelect?.(cat.slug);
                    onClose();
                  }}
                >
                  <span className="category-icon">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="category-label">{cat.name}</span>
                  <span className="category-count">{cat.products_count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;