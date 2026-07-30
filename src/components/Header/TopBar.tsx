import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useLanguage } from "../../context/LanguageContext";
import type { LangCode } from "../../i18n/translations";
import "./TopBar.css";

const languageOptions = [
  { label: "O'zbek", value: "uz" },
  { label: "Русский", value: "ru" },
  { label: "English", value: "en" },
];

const currencyOptions = [
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
  { label: "INR", value: "inr" },
];

const TopBar = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-left">
          <Link to="/about">{t("nav_about")}</Link>
          <Link to="/profile">{t("account")}</Link>
          <Link to="/wishlist">{t("wishlist")}</Link>
          <a href="#" onClick={(e) => e.preventDefault()} className="topbar-link-disabled">
            {t("order_tracking")}
          </a>
        </div>

        <div className="topbar-center">{t("secure_delivery_note")}</div>

        <div className="topbar-right">
          <span className="top-help">
            {t("need_help")}{" "}
            <a href="tel:+998901234567" className="topbar-phone">
              +998 90 123 45 67
            </a>
          </span>
          <Dropdown
            options={languageOptions}
            defaultValue={lang}
            onChange={(value) => setLang(value as LangCode)}
          />
          <Dropdown options={currencyOptions} defaultValue="usd" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
