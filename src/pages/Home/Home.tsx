import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Hero from "../../components/Hero/Hero";
import DealsOfTheDay from "../../components/DealsOfTheDay/DealsOfTheDay";
import PromoBanners from "../../components/PromoBanners/PromoBanners";
import ShopByCategories from "../../components/ShopByCategories/ShopByCategories";
import ProductColumns from "../../components/ProductColumns/ProductColumns";
import CategorySidebar from "../../components/CategorySidebar/CategorySidebar";
import ProductTags from "../../components/CategorySidebar/ProductTags";
import PriceRangeFilter from "../../components/PriceRangeFilter/PriceRangeFilter";
import RatingFilter from "../../components/RatingFilter/RatingFilter";
import BrandFilter from "../../components/BrandFilter/BrandFilter";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import SectionNav from "../../components/SectionNav/SectionNav";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import { getCategories } from "../../api/categories";
import "./Home.css";

const SECTION_NAV_ITEMS = [
  { id: "section-popular", label: "Ommabop" },
  { id: "section-deals", label: "Kuning aksiyasi" },
  { id: "section-categories", label: "Kategoriyalar" },
  { id: "section-trending", label: "Trend mahsulotlar" },
];

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const query = searchParams.get("q") || undefined;
  const tag = searchParams.get("tag") || undefined;
  const priceMinParam = searchParams.get("price_min");
  const priceMaxParam = searchParams.get("price_max");
  const priceMin = priceMinParam ? Number(priceMinParam) : undefined;
  const priceMax = priceMaxParam ? Number(priceMaxParam) : undefined;
  const vendorId = searchParams.get("vendor") || undefined;
  const ratingParam = searchParams.get("rating");
  const minRating = ratingParam ? Number(ratingParam) : undefined;

  const [categoryIdBySlug, setCategoryIdBySlug] = useState<Record<string, string>>({});

  useEffect(() => {
    getCategories()
      .then((res) => {
        const list = res?.data?.categories || [];
        const map: Record<string, string> = {};
        list.forEach((c: any) => (map[c.slug] = c.id));
        setCategoryIdBySlug(map);
      })
      .catch(() => setCategoryIdBySlug({}));
  }, []);

  const categoryId = category ? categoryIdBySlug[category] : undefined;

  const updateParams = (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    setSearchParams(params);
  };

  return (
    <Layout>
      <Hero />

      <SectionNav items={SECTION_NAV_ITEMS} />

      <section id="section-popular" className="shop-section">
        <div className="container">
          <h2 className="shop-section-title">Ommabop mahsulotlar</h2>
          <div className="shop-inner">
          <div className="shop-sidebar">
            <CategorySidebar
              activeCategory={category}
              onSelect={(slug) => updateParams({ category: slug })}
            />
            <PriceRangeFilter
              initialMin={priceMin}
              initialMax={priceMax}
              onApply={(min, max) =>
                updateParams({
                  price_min: min !== undefined ? String(min) : undefined,
                  price_max: max !== undefined ? String(max) : undefined,
                })
              }
            />
            <ProductTags activeTag={tag} onSelectTag={(t) => updateParams({ tag: t })} />
            <RatingFilter value={minRating} onChange={(r) => updateParams({ rating: r ? String(r) : undefined })} />
            <BrandFilter value={vendorId} onChange={(v) => updateParams({ vendor: v })} />
          </div>

          <ProductGrid
            category={category}
            categoryId={categoryId}
            vendorId={vendorId}
            tag={tag}
            searchQuery={query}
            priceMin={priceMin}
            priceMax={priceMax}
            minRating={minRating}
          />
          </div>
        </div>
      </section>
      
      <div id="section-deals">
        <DealsOfTheDay />
      </div>
      <PromoBanners />
      <div id="section-categories">
        <ShopByCategories />
      </div>
      <div id="section-trending">
        <ProductColumns />
      </div>

      <RecentlyViewed />
    </Layout>
  );
};

export default Home;
