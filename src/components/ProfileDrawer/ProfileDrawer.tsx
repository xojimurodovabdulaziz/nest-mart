import { useNavigate } from "react-router-dom";
import {
  X,
  MessageCircle,
  Package,
  ShoppingBag,
  RotateCcw,
  Ticket,
  Star,
  Heart,
  GitCompare,
  User,
  Store,
  MapPin,
  Settings,
  Info,
  LogOut,
} from "lucide-react";
import { useProfileDrawer } from "../../context/ProfileDrawerContext";
import { useToast } from "../Toast/ToastContext";
import "./ProfileDrawer.css";

const notReady = (showToast: (msg: string, type?: "success" | "error") => void) => () =>
  showToast("Bu bo'lim hozircha backendda mavjud emas", "error");

interface Row {
  icon: typeof Package;
  label: string;
  onClick: () => void;
}

const ProfileDrawer = () => {
  const { isOpen, close } = useProfileDrawer();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const token = localStorage.getItem("access_token");
  const name =
    localStorage.getItem("profile_name_override") ||
    localStorage.getItem("user_name") ||
    "Foydalanuvchi";
  const avatar = localStorage.getItem("profile_avatar");

  if (!isOpen) return null;

  const go = (path: string) => () => {
    close();
    navigate(path);
  };

  if (!token) {
    return (
      <div className="profile-drawer-overlay" onClick={close}>
        <div className="profile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="profile-drawer-header-bar">
            <button type="button" className="profile-drawer-close" onClick={close} aria-label="Yopish">
              <X size={18} />
            </button>
          </div>
          <div className="profile-drawer-guest">
            <p>Xarid tarixi va sozlamalarni ko'rish uchun tizimga kiring</p>
            <button type="button" className="profile-drawer-login-btn" onClick={go("/login")}>
              Kirish
            </button>
          </div>
        </div>
      </div>
    );
  }

  const purchases: Row[] = [
    { icon: Package, label: "Buyurtmalar", onClick: notReady(showToast) },
    { icon: ShoppingBag, label: "Sotib olingan tovarlar", onClick: notReady(showToast) },
    { icon: RotateCcw, label: "Qaytarishlar", onClick: notReady(showToast) },
  ];

  const benefit: Row[] = [{ icon: Ticket, label: "Promokodlar", onClick: notReady(showToast) }];

  const myMarket: Row[] = [
    { icon: Star, label: "Sharhlar va savollar", onClick: notReady(showToast) },
    { icon: Heart, label: "Sevimlilar", onClick: go("/wishlist") },
    { icon: GitCompare, label: "Solishtirish ro'yxati", onClick: go("/compare") },
    { icon: User, label: "Mening profilim", onClick: go("/profile") },
  ];

  const other: Row[] = [
    { icon: Store, label: "Sotuvchi bo'ling", onClick: go("/become-vendor") },
    { icon: MapPin, label: "Yetkazib berish punkti", onClick: notReady(showToast) },
    { icon: Settings, label: "Sozlamalar", onClick: notReady(showToast) },
    { icon: Info, label: "Xizmat haqida", onClick: go("/about") },
  ];

  const renderGroup = (title: string, rows: Row[]) => (
    <div className="profile-drawer-group" key={title}>
      <p className="profile-drawer-group-title">{title}</p>
      {rows.map((row) => (
        <button type="button" className="profile-drawer-row" key={row.label} onClick={row.onClick}>
          <row.icon size={18} />
          <span>{row.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="profile-drawer-overlay" onClick={close}>
      <div className="profile-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="profile-drawer-top">
          <button type="button" className="profile-drawer-avatar-btn" onClick={go("/profile")}>
            {avatar ? (
              <img src={avatar} alt={name} />
            ) : (
              <span className="profile-drawer-avatar-fallback">{name.charAt(0).toUpperCase()}</span>
            )}
          </button>
          <p className="profile-drawer-name">{name}</p>
          <button type="button" className="profile-drawer-chat-btn" onClick={go("/contact")} aria-label="Chat">
            <MessageCircle size={18} />
          </button>
          <button type="button" className="profile-drawer-close" onClick={close} aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <div className="profile-drawer-scroll">
          {renderGroup("Xaridlar", purchases)}
          {renderGroup("Foyda", benefit)}
          {renderGroup("Mening Market'im", myMarket)}
          {renderGroup("Boshqa", other)}

          <button
            type="button"
            className="profile-drawer-row profile-drawer-logout"
            onClick={() => {
              localStorage.clear();
              close();
              navigate("/");
            }}
          >
            <LogOut size={18} />
            <span>Chiqish</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
