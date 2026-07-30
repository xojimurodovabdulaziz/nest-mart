import "./QuantitySelector.css";

interface Props {
  quantity: number;
  onChange: (q: number) => void;
  max?: number;
}

const QuantitySelector = ({ quantity, onChange, max = 99 }: Props) => {
  return (
    <div className="qty-selector">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        aria-label="Decrease"
      >
        −
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
