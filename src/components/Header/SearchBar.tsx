import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { getCategories } from "../../api/categories";
import { searchProducts } from "../../api/products";
import "./SearchBar.css";

const DEBOUNCE_MS = 350;

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res?.data?.categories || []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced-qidiruv: har harf terilganda emas, yozish to'xtaganidan
  // 350ms keyin API'ga bitta so'rov yuboradi.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsSuggestLoading(false);
      return;
    }

    setIsSuggestLoading(true);
    debounceRef.current = setTimeout(() => {
      searchProducts(trimmed)
        .then((res) => {
          setSuggestions((res?.data?.products || []).slice(0, 5));
          setShowSuggestions(true);
        })
        .catch(() => setSuggestions([]))
        .finally(() => setIsSuggestLoading(false));
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedCategory) params.set("category", selectedCategory);
    navigate(`/?${params.toString()}`);
  };

  const handleSuggestionClick = (id: string) => {
    setShowSuggestions(false);
    navigate(`/product/${id}`);
  };

  const activeLabel =
    categories.find((c) => c.slug === selectedCategory)?.name || "All Categories";

  return (
    <div className="search-bar-wrap" ref={wrapRef}>
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-category" ref={ref}>
          <button type="button" className="search-category-btn" onClick={() => setIsOpen((p) => !p)}>
            {activeLabel} <ChevronDown size={14} />
          </button>

          {isOpen && (
            <ul className="search-category-menu">
              <li onClick={() => { setSelectedCategory(null); setIsOpen(false); }}>All Categories</li>
              {categories.map((cat) => (
                <li key={cat.id} onClick={() => { setSelectedCategory(cat.slug); setIsOpen(false); }}>
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          placeholder="Search for items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setShowSuggestions(true)}
        />

        <button type="submit" className="search-submit-btn" aria-label="Search">
          <Search size={18} />
        </button>
      </form>

      {showSuggestions && (query.trim().length >= 2) && (
        <div className="search-suggestions">
          {isSuggestLoading && <div className="search-suggestion-status">Qidirilmoqda...</div>}
          {!isSuggestLoading && suggestions.length === 0 && (
            <div className="search-suggestion-status">Hech narsa topilmadi</div>
          )}
          {!isSuggestLoading &&
            suggestions.map((p) => (
              <button
                type="button"
                key={p.id}
                className="search-suggestion-item"
                onClick={() => handleSuggestionClick(p.id)}
              >
                <img src={p.main_image} alt={p.name} loading="lazy" decoding="async" />
                <span className="search-suggestion-name">{p.name}</span>
                <span className="search-suggestion-price">${p.price}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
