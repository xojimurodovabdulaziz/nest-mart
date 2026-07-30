import { useState } from "react";
import { X } from "lucide-react";
import { addVendorByAdmin } from "../../api/admin-vendors";
import { useToast } from "../../components/Toast/ToastContext";
import "./AddVendorModal.css";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const AddVendorModal = ({ onClose, onCreated }: Props) => {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    store_name: "",
    owner_name: "",
    email: "",
    phone: "",
    logo: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token") || "";
    setIsSaving(true);
    try {
      const trimmedLogo = form.logo.trim();
      const isValidUrl = /^https?:\/\/.+/i.test(trimmedLogo);
      const payload = isValidUrl ? { ...form, logo: trimmedLogo } : { ...form, logo: undefined };
      await addVendorByAdmin(token, payload);
      showToast("Sotuvchi qo'shildi va tasdiqlandi", "success");
      onCreated();
      onClose();
    } catch (err: any) {
      showToast(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="add-vendor-overlay" onClick={onClose}>
      <div className="add-vendor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-vendor-header">
          <h3>Yangi sotuvchi qo'shish</h3>
          <button type="button" className="add-vendor-close" onClick={onClose} aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-vendor-form">
          <input type="text" placeholder="Do'kon nomi" value={form.store_name}
            onChange={(e) => handleChange("store_name", e.target.value)} required />
          <input type="text" placeholder="Ism-familiya" value={form.owner_name}
            onChange={(e) => handleChange("owner_name", e.target.value)} required />
          <input type="email" placeholder="Email" value={form.email}
            onChange={(e) => handleChange("email", e.target.value)} required />
          <input type="tel" placeholder="+998 90 123 45 67" value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)} required />
          <input type="text" placeholder="Logotip URL (ixtiyoriy)" value={form.logo}
            onChange={(e) => handleChange("logo", e.target.value)} />

          <button type="submit" disabled={isSaving} className="add-vendor-submit">
            {isSaving ? "Saqlanmoqda..." : "Qo'shish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVendorModal;
