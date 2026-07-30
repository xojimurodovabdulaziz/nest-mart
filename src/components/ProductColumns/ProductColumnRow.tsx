import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const ProductColumnRow = ({ product }: { product: any }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-column-row">
      <img src={product.main_image} alt={product.name} className="product-column-thumb" loading="lazy" decoding="async" />

      <div className="product-column-info">
        <p className="product-column-name">{product.name}</p>

        <div className="product-column-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              fill={i < Math.round(product.rating || 0) ? "#f5a623" : "none"}
              stroke={i < Math.round(product.rating || 0) ? "#f5a623" : "#ccc"}
            />
          ))}
          <span>{product.reviews_count || 0}</span>
        </div>

        <div className="product-column-price-row">
          <span className="product-column-price">${product.price}</span>
          {product.old_price && (
            <span className="product-column-old-price">${product.old_price}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductColumnRow;
