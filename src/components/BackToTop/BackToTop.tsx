import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import "./BackToTop.css";

const SHOW_AFTER_PX = 400;

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button type="button" className="back-to-top" onClick={handleClick} aria-label="Yuqoriga qaytish">
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
