import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getProducts } from "../../api/products";
import "./ProductTags.css";

interface Props {
  activeTag?: string;
  onSelectTag: (tag: string | undefined) => void;
}

const ProductTags = ({ activeTag, onSelectTag }: Props) => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    getProducts({ page: 1, limit: 50 })
      .then((res) => {
        const products = res?.data?.products || [];
        const unique = new Set<string>();
        products.forEach((p: any) => (p.tags || []).forEach((t: string) => unique.add(t)));
        setTags(Array.from(unique));
      })
      .catch(() => setTags([]));
  }, []);

  if (tags.length === 0) return null;

  return (
    <div className="sidebar-block product-tags">
      <h3>Product Tags</h3>
      <div className="tags-list">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag-pill ${activeTag === tag ? "active" : ""}`}
            onClick={() => onSelectTag(activeTag === tag ? undefined : tag)}
          >
            {activeTag === tag && <X size={12} />}
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTags;
