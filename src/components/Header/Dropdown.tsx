import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Dropdown = ({ options, defaultValue, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption>(
    options.find((opt) => opt.value === defaultValue) || options[0]
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected.label}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`dropdown-item ${
                  option.value === selected.value ? "active" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;