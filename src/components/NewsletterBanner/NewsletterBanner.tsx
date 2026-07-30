import { useState } from "react";
import { subscribeNewsletter } from "../../api/vendors";
import "./NewsletterBanner.css";

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    try {
      await subscribeNewsletter(email.trim());
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="newsletter-banner">
      <div className="container newsletter-inner">
        <div className="newsletter-text">
          <h2>Uydan chiqmasdan kerakli mahsulotlarni buyurtma qiling</h2>
          <p>
            Kundalik xaridlaringizni <span>Nest Mart</span> bilan boshlang
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email manzilingiz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "..." : "Obuna bo'lish"}
            </button>
          </form>

          {status === "done" && <p className="newsletter-msg success">Muvaffaqiyatli obuna bo'ldingiz!</p>}
          {status === "error" && <p className="newsletter-msg error">Xatolik yuz berdi, qayta urinib ko'ring</p>}
        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
