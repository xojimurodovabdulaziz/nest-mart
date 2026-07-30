import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useToast } from "../Toast/ToastContext";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { showToast } = useToast();
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("user_role");
  const isKnownNonAdmin = role === "user";

  useEffect(() => {
    if (token && isKnownNonAdmin) {
      showToast("Bu sahifa faqat admin uchun mo'ljallangan", "error");
    }
  }, []);

  if (!token) return <Navigate to="/login" replace />;
  if (isKnownNonAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default AdminRoute;
