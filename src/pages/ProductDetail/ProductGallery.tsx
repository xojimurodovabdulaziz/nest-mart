import { useState } from "react";
import { Search } from "lucide-react";
import "./ProductGallery.css";

interface Props {
  mainImage: string;
  gallery?: string[];
  name: string;
}

const ProductGallery = ({ mainImage, gallery, name }: Props) => {
  const images = [mainImage, ...(gallery || [])].filter(Boolean);
  const [active, setActive] = useState(images[0]);

  return (
    <div className="gallery">
      <div className="gallery-main">
        <button className="gallery-zoom" aria-label="Zoom">
          <Search size={18} />
        </button>
        <img src={active} alt={name} />
      </div>

      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`gallery-thumb ${img === active ? "active" : ""}`}
              onClick={() => setActive(img)}
            >
              <img src={img} alt={`${name} ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
