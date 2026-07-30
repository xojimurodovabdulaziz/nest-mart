import { useState } from "react";
import "./PriceRangeFilter.css";

interface Props {
  min?: number;
  max?: number;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

const PRESETS: { label: string; min?: number; max?: number }[] = [
  { label: "100 mingacha", max: 100_000 },
  { label: "100 ming – 300 ming", min: 100_000, max: 300_000 },
  { label: "300 ming – 1 mln", min: 300_000, max: 1_000_000 },
  { label: "1 mln dan yuqori", min: 1_000_000 },
];

const PriceRangeFilter = ({ min, max, onChange }: Props) => {
  const [minInput, setMinInput] = useState(min?.toString() || "");
  const [maxInput, setMaxInput] = useState(max?.toString() || "");

  const isActivePreset = (preset: (typeof PRESETS)[number]) =>
    preset.min === min && preset.max === max;

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    if (isActivePreset(preset)) {
      onChange(undefined, undefined);
      setMinInput("");
      setMaxInput("");
      return;
    }
    onChange(preset.min, preset.max);
    setMinInput(preset.min?.toString() || "");
    setMaxInput(preset.max?.toString() || "");
  };

  const applyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedMin = minInput ? Number(minInput) : undefined;
    const parsedMax = maxInput ? Number(maxInput) : undefined;
    onChange(parsedMin, parsedMax);
  };

  const clearAll = () => {
    setMinInput("");
    setMaxInput("");
    onChange(undefined, undefined);
  };

  return (
    <div className="sidebar-block price-range-filter">
      <h3>Narx bo'yicha</h3>

      <div className="price-preset-list">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            className={`price-preset-btn ${isActivePreset(preset) ? "active" : ""}`}
            onClick={() => applyPreset(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <form className="price-custom-form" onSubmit={applyCustom}>
        <input
          type="number"
          min={0}
          placeholder="dan"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
        />
        <span className="price-custom-sep">—</span>
        <input
          type="number"
          min={0}
          placeholder="gacha"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
        />
        <button type="submit" className="price-custom-apply">
          OK
        </button>
      </form>

      {(min !== undefined || max !== undefined) && (
        <button type="button" className="price-clear-btn" onClick={clearAll}>
          Filterni tozalash
        </button>
      )}
    </div>
  );
};

export default PriceRangeFilter;
