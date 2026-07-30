import { useNavigate } from "react-router-dom";
import PriceRangeFilter from "../../components/PriceRangeFilter/PriceRangeFilter";

const PriceFilter = () => {
  const navigate = useNavigate();

  const handleApply = (min: number | undefined, max: number | undefined) => {
    const params = new URLSearchParams();
    if (min !== undefined) params.set("price_min", String(min));
    if (max !== undefined) params.set("price_max", String(max));
    navigate(`/?${params.toString()}`);
  };

  return <PriceRangeFilter onApply={handleApply} />;
};

export default PriceFilter;
