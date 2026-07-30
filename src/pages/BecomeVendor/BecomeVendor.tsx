import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { registerVendor } from "../../api/vendors";
import VendorSuccess from "./VendorSuccess";
import "./BecomeVendor.css";
import usePageTitle from "../../hooks/usePageTitle";

const BecomeVendor = () => {
  usePageTitle("Sotuvchi bo'lish");

  const [form, setForm] = useState({
    store_name: "",
    owner_name: "",
    email: "",
    phone: "",
    logo: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const trimmedLogo = form.logo.trim();
      const isValidUrl = /^https?:\/\/.+/i.test(trimmedLogo);
      if (trimmedLogo && !isValidUrl) {
        setStatus("error");
        setError("Logotip URL http:// yoki https:// bilan boshlanishi kerak");
        return;
      }
      const payload = isValidUrl ? { ...form, logo: trimmedLogo } : { ...form, logo: undefined };
      const res = await registerVendor(payload);
      const vendorId = res?.data?.vendor?.id;
      if (vendorId) {
        localStorage.setItem("vendor_id", vendorId);
        localStorage.setItem("vendor_status", "pending");
      }
      setStatus("done");
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="container vendor-form-page">
        {status === "done" ? (
          <VendorSuccess />
        ) : (
          <>
            <h1>Sotuvchi sifatida ro'yxatdan o'tish</h1>

            <form className="vendor-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Do'kon nomi" value={form.store_name}
                onChange={(e) => handleChange("store_name", e.target.value)} required />
              <input type="text" placeholder="Ism-familiyangiz" value={form.owner_name}
                onChange={(e) => handleChange("owner_name", e.target.value)} required />
              <input type="email" placeholder="Email" value={form.email}
                onChange={(e) => handleChange("email", e.target.value)} required />
              <input type="tel" placeholder="+998 90 123 45 67" value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)} required />
              <input type="text" placeholder="Do'kon logotipi URL (ixtiyoriy)" value={form.logo}
                onChange={(e) => handleChange("logo", e.target.value)} />

              {error && <p className="vendor-error">{error}</p>}

              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Yuborilmoqda..." : "Ariza yuborish"}
              </button>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BecomeVendor;
