import { Link } from "react-router-dom";
import { Clock, XCircle, Store } from "lucide-react";
import type { VendorAccessState } from "./useVendorAccess";
import "./VendorAccessGate.css";

const CONTENT: Record<string, { icon: any; title: string; text: string }> = {
  pending: {
    icon: Clock,
    title: "Arizangiz ko'rib chiqilmoqda",
    text: "Admin arizangizni tasdiqlagandan so'ng, bu yerdan mahsulot qo'sha olasiz.",
  },
  rejected: {
    icon: XCircle,
    title: "Arizangiz rad etildi",
    text: "Afsuski, sotuvchilik arizangiz tasdiqlanmadi. Qayta murojaat qilishingiz mumkin.",
  },
  "not-applied": {
    icon: Store,
    title: "Siz hali sotuvchi emassiz",
    text: "Mahsulot sotishni boshlash uchun avval sotuvchi sifatida ro'yxatdan o'ting.",
  },
};

const VendorAccessGate = ({ state }: { state: VendorAccessState }) => {
  const content = CONTENT[state];
  if (!content) return null;
  const Icon = content.icon;

  return (
    <div className="vendor-access-gate">
      <Icon size={40} />
      <h2>{content.title}</h2>
      <p>{content.text}</p>
      {state !== "pending" && (
        <Link to="/become-vendor" className="vendor-access-btn">
          {state === "rejected" ? "Qayta murojaat qilish" : "Sotuvchi bo'lish"}
        </Link>
      )}
    </div>
  );
};

export default VendorAccessGate;
