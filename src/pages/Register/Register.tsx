import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import SuccessAnimation from "../../components/SuccessAnimation/SuccessAnimation";
import { registerUser } from "../../api/auth";
import { normalizeRole } from "../../utils/role";
import "./Register.css";
import usePageTitle from "../../hooks/usePageTitle";

export const Register = () => {
  usePageTitle("Ro'yxatdan o'tish");

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"customer" | "vendor">("customer");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const finishAndRedirect = (path: string) => {
    setShowSuccess(true);
    setTimeout(() => navigate(path), 1400);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const result = await registerUser(email, password, fullName);

      const token = result?.data?.access_token;
      const user = result?.data?.user;

      const nextPath = accountType === "vendor" ? "/become-vendor" : "/";

      if (!token) {
        if (accountType === "vendor") {
          localStorage.setItem("post_login_redirect", "/become-vendor");
        }
        finishAndRedirect("/login");
        return;
      }

      localStorage.setItem("access_token", token);
      localStorage.setItem("user_email", user?.email || email);
      localStorage.setItem(
        "user_name",
        user?.full_name || user?.name || fullName || "Foydalanuvchi"
      );
      localStorage.setItem("user_role", normalizeRole(result));
      if (user?.id) localStorage.setItem("user_id", user.id);

      finishAndRedirect(nextPath);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return <SuccessAnimation message="Muvaffaqiyatli ro'yxatdan o'tdingiz!" />;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="back-link">← Bosh sahifaga qaytish</Link>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Ro'yxatdan o'tish</h2>

          <div className="account-type-toggle" role="radiogroup" aria-label="Hisob turi">
            <button
              type="button"
              role="radio"
              aria-checked={accountType === "customer"}
              className={`account-type-btn ${accountType === "customer" ? "active" : ""}`}
              onClick={() => setAccountType("customer")}
            >
              Xaridor
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={accountType === "vendor"}
              className={`account-type-btn ${accountType === "vendor" ? "active" : ""}`}
              onClick={() => setAccountType("vendor")}
            >
              Sotuvchi
            </button>
          </div>
          {accountType === "vendor" && (
            <p className="account-type-hint">
              Ro'yxatdan o'tgach, do'koningiz haqida ariza to'ldirasiz — admin
              tasdiqlagach sotuvchi panelidan foydalana olasiz.
            </p>
          )}

          <FormInput id="register-name" label="To'liq ism" autoComplete="name"
            value={fullName} onChange={setFullName} placeholder="Ali" />
          <FormInput id="register-email" label="Email" type="email" autoComplete="email"
            value={email} onChange={setEmail} placeholder="u@x.com" />
          <FormInput id="register-password" label="Parol" type="password" autoComplete="new-password"
            value={password} onChange={setPassword} placeholder="123456" />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
          </button>

          <div className="toggle-text">
            Hisobingiz bormi? <Link to="/login">Tizimga kiring</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
