import type { ReactNode } from "react";
import Header from "../Header/Header";
import NewsletterBanner from "../NewsletterBanner/NewsletterBanner";
import TrustBadges from "../TrustBadges/TrustBadges";
import Footer from "../Footer/Footer";
import BottomNav from "../BottomNav/BottomNav";
import MiniCartBar from "../MiniCartBar/MiniCartBar";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer";
import BackToTop from "../BackToTop/BackToTop";

interface Props {
  children: ReactNode;
  hideNewsletter?: boolean;
}

const Layout = ({ children, hideNewsletter = false }: Props) => {
  return (
    <div className="page">
      <a href="#main-content" className="skip-link">
        Asosiy kontentga o'tish
      </a>
      <Header />
      <main id="main-content">{children}</main>
      {!hideNewsletter && <NewsletterBanner />}
      {!hideNewsletter && <TrustBadges />}
      <Footer />
      <MiniCartBar />
      <BottomNav />
      <ProfileDrawer />
      <BackToTop />
    </div>
  );
};

export default Layout;
