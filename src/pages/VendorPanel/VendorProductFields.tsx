interface Props {
  form: any;
  categories: any[];
  onChange: (field: string, value: string | boolean) => void;
}

const VendorProductFields = ({ form, categories, onChange }: Props) => {
  return (
    <>
      <div className="vendor-form-row">
        <input type="number" placeholder="Narxi ($)" value={form.price}
          onChange={(e) => onChange("price", e.target.value)} required />
        <input type="number" placeholder="Eski narx ($, ixtiyoriy)" value={form.old_price}
          onChange={(e) => onChange("old_price", e.target.value)} />
      </div>

      <div className="vendor-form-row">
        <input type="number" placeholder="Chegirma % (ixtiyoriy)" value={form.discount_percent}
          onChange={(e) => onChange("discount_percent", e.target.value)} />
        <input type="number" placeholder="Ombordagi soni" value={form.stock_qty}
          onChange={(e) => onChange("stock_qty", e.target.value)} required />
      </div>

      <select value={form.category_id} onChange={(e) => onChange("category_id", e.target.value)} required>
        <option value="">Kategoriyani tanlang</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input placeholder="Rasm URL" value={form.main_image}
        onChange={(e) => onChange("main_image", e.target.value)} required />
      <input placeholder="Tag'lar (vergul bilan: New, Hot, Organic)" value={form.tags}
        onChange={(e) => onChange("tags", e.target.value)} />

      <label className="vendor-form-checkbox">
        <input type="checkbox" checked={form.in_stock}
          onChange={(e) => onChange("in_stock", e.target.checked)} />
        Sotuvda mavjud
      </label>
    </>
  );
};

export default VendorProductFields;
