interface Props {
  products: any[];
  isLoading: boolean;
  onEdit: (p: any) => void;
  onDelete: (id: string) => void;
}

const VendorProductsGrid = ({ products, isLoading, onEdit, onDelete }: Props) => {
  if (isLoading) return <p className="vendor-panel-status">Yuklanmoqda...</p>;
  if (products.length === 0) return <p className="vendor-panel-status">Mahsulot topilmadi</p>;

  return (
    <div className="vendor-products-grid">
      {products.map((p) => (
        <div className="vendor-product-card" key={p.id}>
          <img src={p.main_image} alt={p.name} loading="lazy" decoding="async" />
          <p className="vendor-product-name">{p.name}</p>
          <p className="vendor-product-price">${p.price}</p>
          <p className="vendor-product-stock">{p.stock_qty} dona omborda</p>
          <div className="vendor-product-actions">
            <button onClick={() => onEdit(p)}>Edit</button>
            <button onClick={() => onDelete(p.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorProductsGrid;
