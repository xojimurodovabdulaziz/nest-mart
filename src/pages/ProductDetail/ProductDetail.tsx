import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { getProductById } from "../../api/products-detail";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { useToast } from "../../components/Toast/ToastContext";
import ProductGallery from "./ProductGallery";
import DetailInfo from "./DetailInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import ProductSidebar from "./ProductSidebar";
import StickyBuyBar from "./StickyBuyBar";
import "./ProductDetail.css";
import usePageTitle from "../../hooks/usePageTitle";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import { addRecentlyViewed } from "../../hooks/useRecentlyViewed";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { ids: wishIds, toggleWishlist } = useWishlist();
  const { ids: compareIds, toggleCompare } = useCompare();
  const { showToast } = useToast();

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const detailTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;

    let isCancelled = false;

    setIsLoading(true);
    setError(null);
    setProduct(null);

    getProductById(id)
      .then((res) => {
        if (isCancelled) return;
        const loaded = res?.data?.product ?? null;
        setProduct(loaded);
        if (loaded) {
          addRecentlyViewed({
            id: loaded.id,
            name: loaded.name,
            main_image: loaded.main_image,
            price: loaded.price,
          });
        }
      })
      .catch((err) => {
        if (isCancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (isCancelled) return;
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (!detailTopRef.current) return;
      const threshold = detailTopRef.current.offsetTop + detailTopRef.current.offsetHeight * 0.25;
      setShowStickyBar(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [product]);

  // Only redirect for the case that's actually true: no session. Any
  // other failure surfaces as a toast instead of silently leaving the page.
  const handleActionError = () => {
    if (!localStorage.getItem("access_token")) {
      showToast("Savatga qo'shish uchun avval tizimga kiring", "error");
      navigate("/login");
    } else {
      showToast("Xatolik yuz berdi, qayta urinib ko'ring", "error");
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product.id).catch(handleActionError);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product.id)
      .then(() => navigate("/cart"))
      .catch(handleActionError);
  };

  const handleWishlist = () => {
    if (!product) return;
    toggleWishlist(product.id).catch(handleActionError);
  };

  const handleCompare = () => {
    if (!product) return;
    toggleCompare(product.id).catch((err) => showToast(err.message));
  };

  usePageTitle(product?.name || "Mahsulot");

  if (isLoading) return <Layout><ProductDetailSkeleton /></Layout>;
  if (error || !product) return <Layout><p className="detail-status">Mahsulot topilmadi</p></Layout>;

  return (
    <Layout>
      <StickyBuyBar
        product={product}
        isLiked={wishIds.has(product.id)}
        onWishlist={handleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        visible={showStickyBar}
      />

      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/?category=${product.category?.slug}`}>{product.category?.name}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      <div className="container product-detail-layout">
        <div className="product-detail-main">
          <div className="detail-top" ref={detailTopRef}>
            <ProductGallery mainImage={product.main_image} gallery={product.gallery} name={product.name} />

            <DetailInfo
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              isLiked={wishIds.has(product.id)}
              isComparing={compareIds.has(product.id)}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
              onCompare={handleCompare}
            />
          </div>

          <ProductTabs
            description={product.description}
            vendorId={product.vendor_id}
            productId={product.id}
            reviewsCount={product.reviews_count}
          />

          <RelatedProducts categorySlug={product.category?.slug} excludeId={product.id} />
        </div>

        <ProductSidebar />
      </div>
    </Layout>
  );
};

export default ProductDetail;