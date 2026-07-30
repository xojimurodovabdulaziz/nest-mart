import { useEffect, useRef, useState } from "react";
import "./SectionNav.css";

interface NavItem {
  id: string;
  label: string;
}

interface Props {
  items: NavItem[];
}

const SectionNav = ({ items }: Props) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0.3,
      }
    );

    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    setActiveId(id);

    const headerHeight = 110;

    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <nav className="section-nav">
      <div className="section-nav-rail">
        {items.map((item) => (
          <button
            key={item.id}
            className={`section-nav-pill ${
              activeId === item.id ? "active" : ""
            }`}
            onClick={() => handleClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SectionNav;