import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../../../components/FormInput/FormInput";
import { loginUser, getMe } from "../../../api/auth";
import { normalizeRole } from "../../../utils/role";
import "./Login.css";
import usePageTitle from "../../../hooks/usePageTitle";

export const Login = () => {
  usePageTitle("Kirish");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const loginResult = await loginUser(email, password);
      const token = loginResult?.data?.access_token;
      if (!token) {
        setError("Server token qaytarmadi. Konsolni tekshiring.");
        return;
      }
      localStorage.setItem("access_token", token);

      try {
        const meResult = await getMe(token);
        const userEmail = meResult?.data?.user?.email || email;
        const userId = meResult?.data?.user?.id;
        const fullName =
          meResult?.data?.profile?.full_name ||
          meResult?.data?.user?.full_name ||
          userEmail;
        const role = normalizeRole(meResult);

        localStorage.setItem("user_email", userEmail);
        localStorage.setItem("user_name", fullName);
        localStorage.setItem("user_role", role);
        if (userId) localStorage.setItem("user_id", userId);
      } catch {
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_name", email);
      }

      const redirectTo = localStorage.getItem("post_login_redirect");
      if (redirectTo) {
        localStorage.removeItem("post_login_redirect");
        navigate(redirectTo);
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="back-link">← Bosh sahifaga qaytish</Link>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Tizimga kirish</h2>

          <FormInput id="login-email" label="Email" type="email" autoComplete="email"
            value={email} onChange={setEmail} placeholder="u@x.com" />
          <FormInput id="login-password" label="Parol" type="password" autoComplete="current-password"
            value={password} onChange={setPassword} placeholder="123456" />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Yuklanmoqda..." : "Kirish"}
          </button>

          <div className="toggle-text">
            Hisobingiz yo'qmi? <Link to="/register">Ro'yxatdan o'ting</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
