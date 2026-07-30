import { useState, useEffect } from "react";
import { getCategories } from "../../api/categories";
import type { AdminProductPayload } from "../../api/admin-products";
import VendorProductFields from "./VendorProductFields";
import "./VendorProductForm.css";

const EMPTY_FORM = {
  name: "", description: "", price: "", old_price: "", discount_percent: "",
  category_id: "", main_image: "", tags: "", stock_qty: "", in_stock: true,
};

interface Props {
  editingProduct: any | null;
  isSending: boolean;
  onSave: (payload: AdminProductPayload) => void;
  onCancel: () => void;
}

const VendorProductForm = ({ editingProduct, isSending, onSave, onCancel }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res?.data?.categories || []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: String(editingProduct.price ?? ""),
        old_price: String(editingProduct.old_price ?? ""),
        discount_percent: String(editingProduct.discount_percent ?? ""),
        category_id: editingProduct.category_id || "",
        main_image: editingProduct.main_image || "",
        tags: (editingProduct.tags || []).join(", "),
        stock_qty: String(editingProduct.stock_qty ?? ""),
        in_stock: editingProduct.in_stock ?? true,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingProduct]);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      old_price: form.old_price ? Number(form.old_price) : undefined,
      discount_percent: form.discount_percent ? Number(form.discount_percent) : undefined,
      category_id: form.category_id,
      main_image: form.main_image,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      stock_qty: Number(form.stock_qty) || 0,
      in_stock: form.in_stock,
    });
  };

  return (
    <form className="vendor-product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}</h2>

      <input placeholder="Mahsulot nomi" value={form.name}
        onChange={(e) => handleChange("name", e.target.value)} required />
      <textarea placeholder="Tavsif" value={form.description}
        onChange={(e) => handleChange("description", e.target.value)} />

      <VendorProductFields form={form} categories={categories} onChange={handleChange} />

      <div className="vendor-form-actions">
        <button type="submit" disabled={isSending}>
          {isSending ? "Saqlanmoqda..." : editingProduct ? "Yangilash" : "Qo'shish"}
        </button>
        {editingProduct && (
          <button type="button" className="vendor-form-cancel" onClick={onCancel}>
            Bekor qilish
          </button>
        )}
      </div>
    </form>
  );
};

export default VendorProductForm;
