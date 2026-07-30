import { Star } from "lucide-react";
import "./StarInput.css";

interface Props {
  value: number;
  onChange: (v: number) => void;
  size?: number;
  readonly?: boolean;
}

const StarInput = ({ value, onChange, size = 20, readonly = false }: Props) => {
  return (
    <div className="star-input">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readonly}
          onClick={() => onChange(n)}
          className="star-input-btn"
          aria-label={`${n} stars`}
        >
          <Star size={size} fill={n <= value ? "#f59e0b" : "none"} color="#f59e0b" />
        </button>
      ))}
    </div>
  );
};

export default StarInput;
