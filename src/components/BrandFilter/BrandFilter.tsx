import { useEffect, useState } from "react";
import { getVendorsList } from "../../api/vendors";
import { useLanguage } from "../../context/LanguageContext";
import "./BrandFilter.css";

interface Props {
  value?: string;
  onChange: (vendorId: string | undefined) => void;
}

const BrandFilter = ({ value, onChange }: Props) => {
  const { t } = useLanguage();
  const [vendors, setVendors] = useState<any[]>([]);

  useEffect(() => {
    getVendorsList()
      .then((res) => {
        const list = res?.data?.vendors || [];
        setVendors(list.filter((v: any) => v.status === "approved"));
      })
      .catch(() => setVendors([]));
  }, []);

  if (vendors.length === 0) return null;

  return (
    <div className="sidebar-block brand-filter">
      <h3>{t("brand_filter_title")}</h3>
      <ul>
        {vendors.map((v) => (
          <li
            key={v.id}
            className={value === v.id ? "active" : ""}
            onClick={() => onChange(value === v.id ? undefined : v.id)}
          >
            {v.store_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
