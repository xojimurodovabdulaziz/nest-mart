import { useState } from "react";
import { X, Search, Check } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { WORLD_LANGUAGES } from "../../i18n/languages";
import type { LangCode } from "../../i18n/translations";
import { useToast } from "../Toast/ToastContext";
import "./LanguagePicker.css";

interface Props {
  onClose: () => void;
}

const LanguagePicker = ({ onClose }: Props) => {
  const { lang, setLang, t } = useLanguage();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");

  const filtered = WORLD_LANGUAGES.filter((l) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return l.name.toLowerCase().includes(q) || l.nativeName.toLowerCase().includes(q);
  });

  const handleSelect = (code: string, supported: boolean) => {
    if (!supported) {
      showToast(t("lang_coming_soon"), "error");
      return;
    }
    setLang(code as LangCode);
    onClose();
  };

  return (
    <div className="lang-picker-overlay" onClick={onClose}>
      <div className="lang-picker-content" onClick={(e) => e.stopPropagation()}>
        <div className="lang-picker-header">
          <h3>{t("lang_picker_title")}</h3>
          <button type="button" className="lang-picker-close" onClick={onClose} aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <div className="lang-picker-search">
          <Search size={16} />
          <input
            type="text"
            autoFocus
            placeholder={t("lang_picker_search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <ul className="lang-picker-list">
          {filtered.map((l) => (
            <li
              key={l.code}
              className={`lang-picker-item ${lang === l.code ? "active" : ""} ${!l.supported ? "disabled" : ""}`}
              onClick={() => handleSelect(l.code, l.supported)}
            >
              <span className="lang-picker-flag">{l.flag}</span>
              <span className="lang-picker-names">
                <span className="lang-picker-native">{l.nativeName}</span>
                <span className="lang-picker-english">{l.name}</span>
              </span>
              {lang === l.code && <Check size={16} className="lang-picker-check" />}
              {!l.supported && <span className="lang-picker-soon">{t("lang_coming_soon")}</span>}
            </li>
          ))}
          {filtered.length === 0 && <li className="lang-picker-empty">—</li>}
        </ul>
      </div>
    </div>
  );
};

export default LanguagePicker;
