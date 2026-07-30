import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import "./LocationSelect.css";

const LOCATIONS = ["Tashkent", "Samarqand", "Buxoro", "Andijon", "Fargona"];

const LocationSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(LOCATIONS[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="location-select" ref={ref}>
      <button type="button" onClick={() => setIsOpen((p) => !p)}>
        <MapPin size={16} />
        <span>{selected}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <ul className="location-menu">
          {LOCATIONS.map((loc) => (
            <li key={loc} onClick={() => { setSelected(loc); setIsOpen(false); }}>
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSelect;
