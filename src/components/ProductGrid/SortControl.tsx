import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "./SortControl.css";

const OPTIONS = [
  { value: "", label: "Default" },
  { value: "created_at", label: "Newest" },
  { value: "price", label: "Price: Low to High" },
  { value: "popular", label: "Popular" },
  { value: "rating", label: "Top Rated" },
];

const SortControl = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel = OPTIONS.find((o) => o.value === value)?.label || "Default";

  return (
    <div className="sort-control" ref={ref}>
      <button type="button" onClick={() => setIsOpen((p) => !p)}>
        Sort by: <strong>{activeLabel}</strong> <ChevronDown size={14} />
      </button>

      {isOpen && (
        <ul className="sort-menu">
          {OPTIONS.map((opt) => (
            <li key={opt.value} onClick={() => { onChange(opt.value); setIsOpen(false); }}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortControl;
