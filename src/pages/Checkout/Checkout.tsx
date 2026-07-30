import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, MapPin, Truck, ChevronLeft } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/ui/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import SuccessAnimation from "../../components/SuccessAnimation/SuccessAnimation";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/Toast/ToastContext";
import usePageTitle from "../../hooks/usePageTitle";
import "./Checkout.css";

const PICKUP_POINTS = [
  { id: "office", label: "Bosh ofis", address: "Amir Temur ko'chasi 1, Toshkent" },
  { id: "warehouse", label: "Ombor", address: "Chilonzor tumani, Toshkent" },
  { id: "shop", label: "Do'kon", address: "Yunusobod tumani, Toshkent" },
];

// Backendda promokod API'si hali yo'q — shu sababli bu faqat frontendda
// ishlaydigan namunaviy chegirma (demo). Haqiqiy loyihada bu serverda
// tekshiriladi.
const DEMO_PROMO_CODES: Record<string, number> = {
  NEST10: 0.1,
  NEST20: 0.2,
};

type DeliveryMethod = "delivery" | "pickup";
type PaymentMethod = "card" | "cash";

const Checkout = () => {
  usePageTitle("Buyurtmani rasmiylashtirish");
  const navigate = useNavigate();
  const { items, total, removeFromCart } = useCart();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");
  const [pickupPoint, setPickupPoint] = useState(PICKUP_POINTS[0].id);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [minDate] = useState(() => new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10));

  const appliedDiscount = DEMO_PROMO_CODES[promoCode.trim().toUpperCase()] || 0;
  const discountAmount = total * appliedDiscount;
  const grandTotal = total - discountAmount;

  if (items.length === 0 && !isDone) {
    return (
      <Layout>
        <div className="container checkout-page">
          <div className="checkout-empty">
            <p>Savatingiz bo'sh — buyurtma berish uchun avval mahsulot qo'shing.</p>
            <Link to="/">Xarid qilishni boshlash</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      showToast("Ism, familiya va telefon raqamini to'ldiring", "error");
      return;
    }
    if (deliveryMethod === "delivery" && !address.trim()) {
      showToast("Yetkazib berish uchun manzilni kiriting", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      // Hozircha buyurtmalar uchun backend endpoint yo'q, shuning uchun
      // buyurtmani "rasmiylashtirish" savatni tozalash va tasdiq
      // ko'rsatishdan iborat. Backend qo'shilganda shu joyga real API
      // chaqiruvi ulanadi.
      await Promise.all(items.map((item) => removeFromCart(item.product_id)));
      setIsDone(true);
      setTimeout(() => navigate("/"), 2600);
    } catch {
      showToast("Buyurtmani rasmiylashtirishda xatolik yuz berdi", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return <SuccessAnimation message="Buyurtmangiz qabul qilindi! Tez orada siz bilan bog'lanamiz." />;
  }

  return (
    <Layout>
      <div className="container checkout-page">
        <Link to="/cart" className="checkout-back-link">
          <ChevronLeft size={16} /> Savatga qaytish
        </Link>
        <h1>Buyurtmani rasmiylashtirish</h1>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form">
            <section className="checkout-section">
              <h2>Aloqa ma'lumotlari</h2>
              <div className="checkout-grid-2">
                <FormInput id="firstName" label="Ism" value={firstName} onChange={setFirstName} />
                <FormInput id="lastName" label="Familiya" value={lastName} onChange={setLastName} />
              </div>
              <FormInput
                id="phone"
                label="Telefon raqam"
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="+998 90 123 45 67"
              />
            </section>

            <section className="checkout-section">
              <h2>Yetkazib berish</h2>
              <div className="checkout-toggle-group">
                <button
                  type="button"
                  className={`checkout-toggle ${deliveryMethod === "delivery" ? "active" : ""}`}
                  onClick={() => setDeliveryMethod("delivery")}
                >
                  <Truck size={16} /> Yetkazib berish
                </button>
                <button
                  type="button"
                  className={`checkout-toggle ${deliveryMethod === "pickup" ? "active" : ""}`}
                  onClick={() => setDeliveryMethod("pickup")}
                >
                  <MapPin size={16} /> Punktdan olib ketish
                </button>
              </div>

              {deliveryMethod === "delivery" ? (
                <>
                  <FormInput
                    id="address"
                    label="Manzil"
                    value={address}
                    onChange={setAddress}
                    placeholder="Ko'cha, uy, xonadon"
                  />
                  <div className="form-group">
                    <label htmlFor="deliveryDate">Qachon kelishi kerak</label>
                    <input
                      id="deliveryDate"
                      type="date"
                      min={minDate}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="checkout-pickup-list">
                  {PICKUP_POINTS.map((point) => (
                    <label key={point.id} className="checkout-pickup-item">
                      <input
                        type="radio"
                        name="pickupPoint"
                        checked={pickupPoint === point.id}
                        onChange={() => setPickupPoint(point.id)}
                      />
                      <span>
                        <strong>{point.label}</strong>
                        <span className="checkout-pickup-address">{point.address}</span>
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <section className="checkout-section">
              <h2>To'lov usuli</h2>
              <div className="checkout-toggle-group">
                <button
                  type="button"
                  className={`checkout-toggle ${paymentMethod === "cash" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("cash")}
                >
                  Naqd pul
                </button>
                <button
                  type="button"
                  className={`checkout-toggle ${paymentMethod === "card" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("card")}
                >
                  Kartadan
                </button>
              </div>
              {paymentMethod === "card" && (
                <p className="checkout-payment-note">
                  Buyurtma tasdiqlangach, to'lov uchun havola telefon raqamingizga yuboriladi.
                </p>
              )}
            </section>
          </div>

          <div className="checkout-summary">
            <h3>Buyurtma tafsilotlari</h3>

            <div className="checkout-summary-items">
              {items.map((item) => (
                <div key={item.id} className="checkout-summary-item">
                  <img src={item.product.main_image} alt={item.product.name} loading="lazy" decoding="async" />
                  <div>
                    <p className="checkout-summary-item-name">{item.product.name}</p>
                    <p className="checkout-summary-item-qty">{item.quantity} x ${item.price_at_add}</p>
                  </div>
                  <span className="checkout-summary-item-total">
                    ${(item.price_at_add * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label htmlFor="promoCode">Promokod (ixtiyoriy)</label>
              <input
                id="promoCode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="NEST10"
              />
            </div>

            <div className="checkout-summary-row">
              <span>Mahsulotlar summasi</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="checkout-summary-row checkout-summary-discount">
                <span>Chegirma ({Math.round(appliedDiscount * 100)}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="checkout-summary-row checkout-summary-total">
              <span>Umumiy summa</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <Button type="submit" fullWidth isLoading={isSubmitting}>
              Buyurtmani rasmiylashtirish
            </Button>

            <p className="checkout-secure-note">
              <ShieldCheck size={14} /> Ma'lumotlaringiz xavfsiz saqlanadi
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
