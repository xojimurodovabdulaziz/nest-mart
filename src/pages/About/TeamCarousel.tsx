import { useState } from "react";
import { TEAM } from "./aboutData";

const FacebookIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.95 2 14.66 2 11.98 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
  </svg>
);

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 5.8c-.75.33-1.55.55-2.39.65a4.18 4.18 0 0 0 1.83-2.3 8.3 8.3 0 0 1-2.65 1.01 4.16 4.16 0 0 0-7.08 3.79A11.8 11.8 0 0 1 3.16 4.6a4.16 4.16 0 0 0 1.29 5.55 4.13 4.13 0 0 1-1.89-.52v.05a4.17 4.17 0 0 0 3.34 4.08 4.2 4.2 0 0 1-1.88.07 4.17 4.17 0 0 0 3.89 2.9A8.35 8.35 0 0 1 2 18.57a11.78 11.78 0 0 0 6.38 1.87c7.66 0 11.85-6.35 11.85-11.85 0-.18 0-.36-.01-.54A8.47 8.47 0 0 0 22 5.8Z" />
  </svg>
);

const PER_PAGE = 2;
const PAGE_COUNT = Math.ceil(TEAM.length / PER_PAGE);

const TeamCarousel = () => {
  const [page, setPage] = useState(0);
  const visible = TEAM.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="about-team-carousel">
      <div className="about-team-grid" key={page}>
        {visible.map((member) => (
          <div className="about-team-card" key={member.name}>
            <div className="about-team-photo-wrap">
              <img src={member.photo} alt={member.name} className="about-team-photo" />
              <div className="about-team-socials">
                <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
                  <FacebookIcon size={14} />
                </a>
                <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
                  <InstagramIcon size={14} />
                </a>
                <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
                  <TwitterIcon size={14} />
                </a>
              </div>
            </div>
            <h3>{member.name}</h3>
            <p className="about-team-role">{member.role}</p>
          </div>
        ))}
      </div>

      {PAGE_COUNT > 1 && (
        <div className="about-team-dots">
          {Array.from({ length: PAGE_COUNT }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}-sahifa`}
              className={`about-team-dot ${page === i ? "active" : ""}`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamCarousel;
