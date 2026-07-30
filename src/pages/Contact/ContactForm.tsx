import { useState } from "react";
import { Sprout } from "lucide-react";
import { useToast } from "../../components/Toast/ToastContext";
import "./ContactForm.css";

const ContactForm = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({ firstName: "", email: "", phone: "", subject: "", message: "" });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Website xabari — ${form.firstName}`);
    const body = encodeURIComponent(
      `${form.message}\n\nIsm: ${form.firstName}\nTelefon: ${form.phone}\nJavob berish uchun: ${form.email}`
    );
    window.location.href = `mailto:sale@nest.com?subject=${subject}&body=${body}`;
    showToast("Email dasturingiz ochilmoqda...", "success");
  };

  return (
    <div className="contact-form-section">
      <p className="contact-form-eyebrow">Xabar yuborish</p>
      <h2>Biz bilan bog'laning</h2>
      <p className="contact-form-note">
        Email manzilingiz hech qayerda e'lon qilinmaydi. * bilan belgilangan maydonlar majburiy
      </p>

      <div className="contact-form-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <input placeholder="Ismingiz *" value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)} required />
            <input type="email" placeholder="Email manzilingiz *" value={form.email}
              onChange={(e) => handleChange("email", e.target.value)} required />
          </div>
          <div className="contact-form-row">
            <input type="tel" placeholder="Telefon raqamingiz" value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)} />
            <input placeholder="Mavzu" value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)} />
          </div>
          <textarea placeholder="Xabaringiz *" value={form.message}
            onChange={(e) => handleChange("message", e.target.value)} required />

          <button type="submit">Xabar yuborish</button>
        </form>

        <div className="contact-form-image">
          <Sprout size={40} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
