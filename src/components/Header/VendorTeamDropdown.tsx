import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Trash2, UserPlus, Store, ArrowRight } from "lucide-react";
import { isAdminRole, isVendorRole } from "../../utils/role";
import { useShopStaff, STAFF_ROLES, type StaffRole } from "./useShopStaff";
import { getVendorsList } from "../../api/vendors";
import "./VendorTeamDropdown.css";

const VendorTeamDropdown = () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("user_role");
  const vendorId = localStorage.getItem("vendor_id");
  const isVendorOrAdmin = Boolean(token && (isVendorRole(role) || isAdminRole(role) || vendorId));

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<StaffRole>("Sotuvchi");
  const [vendors, setVendors] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { staff, addStaff, removeStaff } = useShopStaff(vendorId);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isVendorOrAdmin || !isOpen || vendors.length > 0) return;
    getVendorsList()
      .then((res) => {
        const list = res?.data?.vendors || [];
        setVendors(list.filter((v: any) => v.status === "approved"));
      })
      .catch(() => setVendors([]));
  }, [isOpen, isVendorOrAdmin, vendors.length]);

  if (!isVendorOrAdmin) {
    return (
      <div className="vendor-team-dropdown" ref={ref}>
        <button type="button" className="vendor-team-toggle" onClick={() => setIsOpen((p) => !p)}>
          <span>Sotuvchilar</span> <ChevronDown size={15} />
        </button>

        {isOpen && (
          <div className="vendor-team-menu">
            <p className="vendor-team-title">Sotuvchilar ro'yxati</p>

            {vendors.length === 0 && (
              <p className="vendor-team-empty">Hozircha tasdiqlangan sotuvchi yo'q</p>
            )}

            {vendors.map((v) => (
              <Link
                to={`/?vendor=${v.id}`}
                key={v.id}
                className="vendor-team-store-row"
                onClick={() => setIsOpen(false)}
              >
                {v.logo ? (
                  <img src={v.logo} alt={v.store_name} />
                ) : (
                  <span className="vendor-team-store-fallback">
                    <Store size={14} />
                  </span>
                )}
                <span>{v.store_name}</span>
              </Link>
            ))}

            <Link
              to="/become-vendor"
              className="vendor-team-become-link"
              onClick={() => setIsOpen(false)}
            >
              Sotuvchi bo'ling <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    );
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addStaff(name.trim(), selectedRole);
    setName("");
  };

  return (
    <div className="vendor-team-dropdown" ref={ref}>
      <button type="button" className="vendor-team-toggle" onClick={() => setIsOpen((p) => !p)}>
        <span>Do'kon jamoasi</span> <ChevronDown size={15} />
      </button>

      {isOpen && (
        <div className="vendor-team-menu">
          <p className="vendor-team-title">Xodimlar ro'yxati</p>

          {staff.length === 0 && (
            <p className="vendor-team-empty">Hozircha hech qanday xodim yo'q</p>
          )}

          {staff.map((s) => (
            <div className="vendor-team-row" key={s.id}>
              <div>
                <p className="vendor-team-name">{s.name}</p>
                <span className={`vendor-team-role-badge role-${s.role.toLowerCase()}`}>{s.role}</span>
              </div>
              <button
                type="button"
                className="vendor-team-remove"
                onClick={() => removeStaff(s.id)}
                aria-label="O'chirish"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <form className="vendor-team-add-form" onSubmit={handleAdd}>
            <input
              placeholder="Ism familiya"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as StaffRole)}>
              {STAFF_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button type="submit">
              <UserPlus size={14} /> Qo'shish
            </button>
          </form>

          <p className="vendor-team-note">
            Bu ro'yxat hozircha faqat shu qurilmada saqlanadi — backendda xodimlar (team) uchun
            API mavjud emas.
          </p>
        </div>
      )}
    </div>
  );
};

export default VendorTeamDropdown;
