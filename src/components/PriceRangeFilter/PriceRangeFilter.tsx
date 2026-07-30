import { useState, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./PriceRangeFilter.css";

interface Props {
  bounds?: { min: number; max: number };
  initialMin?: number;
  initialMax?: number;
  onApply: (min: number | undefined, max: number | undefined) => void;
}

const formatSum = (value: number) => `${value.toLocaleString("ru-RU")} so'm`;

const DEFAULT_BOUNDS = { min: 0, max: 2_000_000 };
const STEP = 10_000;

const PriceRangeFilter = ({ bounds = DEFAULT_BOUNDS, initialMin, initialMax, onApply }: Props) => {
  const { t } = useLanguage();
  const [min, setMin] = useState(initialMin ?? bounds.min);
  const [max, setMax] = useState(initialMax ?? bounds.max);
  const [isOpen, setIsOpen] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth > 768
  );

  useEffect(() => {
    setMin(initialMin ?? bounds.min);
    setMax(initialMax ?? bounds.max);
  }, [initialMin, initialMax]);

  const handleMinChange = (value: number) => {
    setMin(Math.min(value, max - STEP));
  };

  const handleMaxChange = (value: number) => {
    setMax(Math.max(value, min + STEP));
  };

  const handleApply = () => {
    onApply(min > bounds.min ? min : undefined, max < bounds.max ? max : undefined);
  };

  const handleReset = () => {
    setMin(bounds.min);
    setMax(bounds.max);
    onApply(undefined, undefined);
  };

  const range = bounds.max - bounds.min;

  return (
    <div className="sidebar-block price-range-filter">
      <button
        type="button"
        className="price-filter-toggle"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
      >
        <h3>{t("price_filter_title")}</h3>
        <ChevronDown size={18} className={isOpen ? "price-filter-chevron open" : "price-filter-chevron"} />
      </button>

      {isOpen && (
        <>
          <div className="price-slider">
            <div className="price-slider-track">
              <div
                className="price-slider-range"
                style={{
                  left: `${((min - bounds.min) / range) * 100}%`,
                  right: `${100 - ((max - bounds.min) / range) * 100}%`,
                }}
              />
            </div>
            <input type="range" min={bounds.min} max={bounds.max} step={STEP} value={min}
              onChange={(e) => handleMinChange(Number(e.target.value))} />
            <input type="range" min={bounds.min} max={bounds.max} step={STEP} value={max}
              onChange={(e) => handleMaxChange(Number(e.target.value))} />
          </div>

          <div className="price-range-labels">
            <span>{t("price_from")}: <strong>{formatSum(min)}</strong></span>
            <span>{t("price_to")}: <strong>{formatSum(max)}</strong></span>
          </div>

          <div className="price-filter-actions">
            <button type="button" className="price-filter-btn" onClick={handleApply}>
              <Filter size={14} /> {t("price_apply")}
            </button>
            <button type="button" className="price-filter-reset" onClick={handleReset}>
              {t("price_reset")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceRangeFilter;
