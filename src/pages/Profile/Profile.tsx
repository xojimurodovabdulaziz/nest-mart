import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Settings,
  Globe,
  Ticket,
  GitCompare,
  Package,
  ShoppingBag,
  RotateCcw,
  HelpCircle,
  MapPin,
  ChevronRight,
  LogOut,
  Pencil,
  ShieldCheck,
  Store,
} from "lucide-react";
import Layout from "../../components/Layout/Layout";
import LanguagePicker from "../../components/LanguagePicker/LanguagePicker";
import { useLanguage } from "../../context/LanguageContext";
import { WORLD_LANGUAGES } from "../../i18n/languages";
import { getMe } from "../../api/auth";
import { useToast } from "../../components/Toast/ToastContext";
import { isAdminRole, isVendorRole } from "../../utils/role";
import "./Profile.css";

const notReady = (showToast: (msg: string, type?: "success" | "error") => void) => () =>
  showToast("Bu bo'lim hozircha backendda mavjud emas", "error");

import usePageTitle from "../../hooks/usePageTitle";

const Profile = () => {
  usePageTitle("Profil");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const token = localStorage.getItem("access_token");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const savedAvatar = localStorage.getItem("profile_avatar");
    if (savedAvatar) setAvatar(savedAvatar);

    getMe(token)
      .then((result) => {
        const name =
          localStorage.getItem("profile_name_override") ||
          result.data.profile.full_name ||
          result.data.user.email;
        setFullName(name);
        setEmail(result.data.user.email);
      })
      .catch(() => {
        localStorage.clear();
        navigate("/login");
      })
      .finally(() => setIsLoading(false));
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Faqat rasm fayli tanlang");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setAvatar(dataUrl);
      localStorage.setItem("profile_avatar", dataUrl);
      showToast("Rasm shu qurilmada saqlandi", "success");
    };
    reader.readAsDataURL(file);
  };

  const startEditName = () => {
    setNameDraft(fullName);
    setIsEditingName(true);
  };

  const saveName = () => {
    const trimmed = nameDraft.trim();
    if (!trimmed) return;
    setFullName(trimmed);
    localStorage.setItem("profile_name_override", trimmed);
    setIsEditingName(false);
    showToast("Ism yangilandi", "success");
  };

  const role = localStorage.getItem("user_role");
  const vendorId = localStorage.getItem("vendor_id");
  const isAdmin = Boolean(token && isAdminRole(role));
  const isVendor = Boolean(token && (isVendorRole(role) || vendorId));
  const [isLangPickerOpen, setIsLangPickerOpen] = useState(false);
  const { lang, t } = useLanguage();
  const currentLangLabel = WORLD_LANGUAGES.find((l) => l.code === lang)?.nativeName ?? "";

  const menuItems = [
    ...(isAdmin
      ? [{ icon: ShieldCheck, label: "Admin bo'limi", onClick: () => navigate("/admin-dashboard"), highlight: true }]
      : []),
    ...(isVendor
      ? [{ icon: Store, label: "Sotuvchi paneli", onClick: () => navigate("/vendor-panel"), highlight: true }]
      : [{ icon: Store, label: "Sotuvchi bo'lish", onClick: () => navigate("/become-vendor") }]),
    { icon: Settings, label: t("profile_settings"), onClick: notReady(showToast) },
    { icon: Globe, label: t("profile_language"), sub: currentLangLabel, onClick: () => setIsLangPickerOpen(true) },
    { icon: Ticket, label: t("profile_promo"), onClick: notReady(showToast) },
    { icon: GitCompare, label: t("profile_compare"), onClick: () => navigate("/compare") },
    { icon: Package, label: t("profile_orders"), onClick: notReady(showToast) },
    { icon: ShoppingBag, label: t("profile_purchased"), onClick: notReady(showToast) },
    { icon: RotateCcw, label: t("profile_returns"), onClick: notReady(showToast) },
    { icon: HelpCircle, label: t("profile_faq"), onClick: () => navigate("/contact") },
    { icon: MapPin, label: t("profile_delivery_points"), onClick: notReady(showToast) },
  ];

  if (!token || isLoading) {
    return <p className="profile-loading">Yuklanmoqda...</p>;
  }

  return (
    <Layout hideNewsletter>
      <div className="container profile-page-v2">
        <div className="profile-hero">
          <button type="button" className="profile-avatar-btn" onClick={handleAvatarClick}>
            {avatar ? (
              <img src={avatar} alt={fullName} className="profile-avatar-img" />
            ) : (
              <span className="profile-avatar-fallback">
                {fullName.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="profile-avatar-camera">
              <Camera size={14} />
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="profile-avatar-input"
            onChange={handleAvatarChange}
          />

          <div className="profile-hero-info">
            {isEditingName ? (
              <div className="profile-name-edit">
                <input
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                />
                <button type="button" onClick={saveName}>Saqlash</button>
              </div>
            ) : (
              <h2>
                {fullName}
                <button
                  type="button"
                  className="profile-name-edit-btn"
                  onClick={startEditName}
                  aria-label="Ismni tahrirlash"
                >
                  <Pencil size={14} />
                </button>
              </h2>
            )}
            <p className="profile-email">{email}</p>
          </div>
        </div>

        <div className="profile-menu">
          {menuItems.map((item) => (
            <button type="button" className="profile-menu-item" key={item.label} onClick={item.onClick}>
              <span className={`profile-menu-icon ${item.highlight ? "profile-menu-icon-highlight" : ""}`}>
                <item.icon size={18} />
              </span>
              <span className="profile-menu-label">
                {item.label}
                {item.sub && <span className="profile-menu-sub"> · {item.sub}</span>}
              </span>
              <ChevronRight size={18} className="profile-menu-chevron" />
            </button>
          ))}
        </div>

        <button type="button" className="profile-logout-btn" onClick={handleLogout}>
          <LogOut size={16} /> Chiqish
        </button>
      </div>

      {isLangPickerOpen && <LanguagePicker onClose={() => setIsLangPickerOpen(false)} />}
    </Layout>
  );
};

export default Profile;
