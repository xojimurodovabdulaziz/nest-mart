import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaShieldAlt,
} from "react-icons/fa";

import Logo from "../../assets/Nest.svg";
import FooterColumn from "./FooterColumn";
import "./Footer.css";
import "./FooterBottomBar.css";

const SOCIALS = [
  { icon: FaFacebook, label: "Facebook" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaLinkedin, label: "LinkedIn" },
  { icon: FaYoutube, label: "YouTube" },
];

const COMPANY = [
  { label: "Biz haqimizda", to: "/about" },
  { label: "Yetkazib berish shartlari" },
  { label: "Maxfiylik siyosati" },
  { label: "Foydalanish shartlari" },
  { label: "Biz bilan bog'lanish", to: "/contact" },
  { label: "Yordam markazi", to: "/contact" },
  { label: "Karyera" },
];

const ACCOUNT = [
  { label: "Tizimga kirish", to: "/login" },
  { label: "Savat", to: "/cart" },
  { label: "Sevimlilar", to: "/wishlist" },
  { label: "Solishtirish", to: "/compare" },
  { label: "Buyurtmani kuzatish", to: "/profile" },
  { label: "Yordam so'rovi", to: "/contact" },
];

const CORPORATE = [
  { label: "Sotuvchi bo'lish", to: "/become-vendor" },
  { label: "Aksiyalar", to: "/discounts" },
  { label: "Hamkorlik dasturi" },
  { label: "Fermer biznesi" },
  { label: "Fermerlar uchun" },
  { label: "Yetkazib beruvchilar" },
];

const POPULAR = [
  { label: "Sut va sut mahsulotlari", to: "/?category=milks-and-dairies" },
  { label: "Sabzavotlar", to: "/?category=vegetables" },
  { label: "Yangi mevalar", to: "/?category=fresh-fruit" },
  { label: "Pishiriq mahsulotlari", to: "/?category=baking-material" },
  { label: "Ichimliklar", to: "/?category=wines-drinks" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={Logo} alt="Nest" />
            <span>Nest</span>
          </Link>

          <p className="footer-tagline">
            Yangi va sifatli mahsulotlar — uyingizga yetkazib beramiz
          </p>

          <p className="footer-address">
            Amir Temur ko'chasi 1, Toshkent
          </p>

          <p className="footer-contact">
            Tel: +998 71 200-00-00
          </p>

          <p className="footer-contact">
            Email: sale@nest.com
          </p>

          <p className="footer-contact">
            Ish vaqti: 08:00 – 22:00
          </p>
        </div>

        <FooterColumn title="Kompaniya" links={COMPANY} />
        <FooterColumn title="Hisob" links={ACCOUNT} />
        <FooterColumn title="Korporativ" links={CORPORATE} />
        <FooterColumn title="Ommabop" links={POPULAR} />

        <div className="footer-column footer-app-column">
          <h4>Ilovani yuklab oling</h4>

          <div className="footer-app-badges">
            <a href="#">
              <FaApple size={20} />
              <span>App Store</span>
            </a>

            <a href="#">
              <FaGooglePlay size={20} />
              <span>Google Play</span>
            </a>
          </div>

          <p className="footer-secure-note">
            <FaShieldAlt size={14} />
            &nbsp;Xavfsiz to'lov tizimi
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} Nest Mart. Barcha huquqlar
            himoyalangan.
          </p>

          <div className="footer-social">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a key={label} href="#">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;