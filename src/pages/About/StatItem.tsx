import { useCountUp } from "./useCountUp";

interface Props {
  target: number;
  label: string;
}

const StatItem = ({ target, label }: Props) => {
  const { ref, value } = useCountUp(target);

  return (
    <div className="about-stat" ref={ref}>
      <p className="about-stat-number">{value.toLocaleString("en-US")}+</p>
      <p className="about-stat-label">{label}</p>
    </div>
  );
};

export default StatItem;
