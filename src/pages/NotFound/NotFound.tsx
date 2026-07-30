import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import usePageTitle from "../../hooks/usePageTitle";
import "./NotFound.css";

const NotFound = () => {
  usePageTitle("Sahifa topilmadi");

  return (
    <Layout hideNewsletter>
      <div className="not-found-page">
        <SearchX size={56} strokeWidth={1.5} />
        <h1>404</h1>
        <p>Kechirasiz, siz qidirgan sahifa topilmadi.</p>
        <Link to="/" className="not-found-link">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
