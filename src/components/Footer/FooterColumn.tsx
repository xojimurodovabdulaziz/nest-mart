import { Link } from "react-router-dom";

interface FooterLink {
  label: string;
  to?: string;
}

const FooterColumn = ({ title, links }: { title: string; links: FooterLink[] }) => {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to}>{link.label}</Link>
            ) : (
              <a href="#" onClick={(e) => e.preventDefault()} className="footer-link-disabled">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
