import "./CategoryBreakdown.css";

interface Props {
  data: { name: string; count: number }[];
}

const CategoryBreakdown = ({ data }: Props) => {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="dashboard-card">
      <h3>Products by Category</h3>
      <div className="category-bars">
        {data.map((d) => (
          <div className="category-bar-row" key={d.name}>
            <span className="category-bar-label">{d.name}</span>
            <div className="category-bar-track">
              <div className="category-bar-fill" style={{ width: `${(d.count / max) * 100}%` }} />
            </div>
            <span className="category-bar-count">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
