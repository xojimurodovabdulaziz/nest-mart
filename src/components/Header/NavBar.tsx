import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Headphones } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";
import NavRoleLink from "./NavRoleLink";
import "./NavBar.css";
import "./NavBarSupport.css";

const NavBar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-category-wrapper">
          <button
            type="button"
            className="category-btn"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          >
            <Menu size={18} />
            Barcha kategoriyalar
          </button>

          <CategoryDropdown
            isOpen={isCategoryOpen}
            onClose={() => setIsCategoryOpen(false)}
          />
        </div>

        <div className="navbar-links">
          <Link to="/discounts">Chegirmalar</Link>
          <Link to="/">Bosh sahifa</Link>
          <Link to="/about">Biz haqimizda</Link>
          <Link to="/">Do'kon</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Aloqa</Link>
          <NavRoleLink />
        </div>

        <div className="navbar-support">
          <Headphones size={26} className="support-icon" />
          <div className="support-text">
            <a href="tel:+998901234567" className="support-phone">
              +998 90 123 45 67
            </a>
            <span className="support-label">24/7 Qo'llab-quvvatlash</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;