import { ArrowRight, Search } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import StatItem from "./StatItem";
import TeamCarousel from "./TeamCarousel";
import {
  HERO_IMAGES,
  FEATURES,
  PARTNER_IMAGES,
  PARTNER_COLUMNS,
  STATS,
  CTA_IMAGE,
} from "./aboutData";
import "./About.css";
import usePageTitle from "../../hooks/usePageTitle";

const About = () => {
  usePageTitle("Biz haqimizda");

  return (
    <Layout hideNewsletter>
      <div className="about-page">
        <section className="container about-hero">
          <div className="about-hero-image">
            <img src={HERO_IMAGES.main} alt="Nest jamoasi" />
          </div>

          <div className="about-hero-content">
            <h1>Nest Mart ga xush kelibsiz</h1>
            <p>
              Nest — bu mahalliy fermerlar va ishonchli sotuvchilarni xaridorlar bilan
              to'g'ridan-to'g'ri bog'laydigan zamonaviy onlayn oziq-ovqat bozori. Biz har bir
              buyurtmani g'amxo'rlik bilan tayyorlaymiz va eng qisqa vaqtda yetkazamiz — sifat va
              ishonchni birinchi o'ringa qo'yamiz.
            </p>
            <div className="about-hero-thumbs">
              <img src={HERO_IMAGES.thumb1} alt="" />
              <img src={HERO_IMAGES.thumb2} alt="" />
              <img src={HERO_IMAGES.thumb3} alt="" />
            </div>
          </div>
        </section>

        <section className="container about-provide">
          <h2 className="about-section-title">Nimalar taklif qilamiz?</h2>

          <div className="about-feature-grid">
            {FEATURES.map((f) => (
              <div className="about-feature-card" key={f.title}>
                <div className="about-feature-icon">
                  <f.icon size={22} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <span className="about-feature-link">
                  Batafsil <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="container about-partner">
          <div className="about-partner-images">
            <img src={PARTNER_IMAGES.main} alt="" className="about-partner-img-main" />
            <img src={PARTNER_IMAGES.secondary} alt="" className="about-partner-img-secondary" />
          </div>

          <div className="about-partner-content">
            <p className="about-eyebrow">Bizning natijalarimiz</p>
            <h2>Onlayn oziq-ovqat xaridi uchun ishonchli hamkoringiz</h2>
            <p className="about-partner-text">
              Biz mijozlarga qulaylik, sotuvchilarga esa keng auditoriya taqdim etamiz.
              Texnologiya va samimiy xizmat uyg'unligida ishlaymiz — shu bois yuzlab oilalar
              har kuni bizni tanlaydi.
            </p>

            <div className="about-partner-columns">
              {PARTNER_COLUMNS.map((col) => (
                <div className="about-partner-col" key={col.title}>
                  <h4>{col.title}</h4>
                  <p>{col.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-stats-bar">
          <div className="container about-stats-inner">
            {STATS.map((s) => (
              <StatItem key={s.label} target={s.target} label={s.label} />
            ))}
          </div>
        </section>

        <section className="container about-team-section">
          <p className="about-eyebrow about-eyebrow-center">Jamoamiz</p>
          <h2 className="about-section-title">Jamoamiz bilan tanishing</h2>
          <p className="about-team-subtitle">
            Har biri o'z sohasi bo'yicha tajribaga ega bo'lgan jamoamiz — sizga eng yaxshi
            xizmatni taqdim etish uchun har kuni ishlaydi.
          </p>

          <TeamCarousel />
        </section>

        <section className="about-cta" style={{ backgroundImage: `url(${CTA_IMAGE})` }}>
          <div className="container about-cta-inner">
            <h2>Uydan chiqmasdan kerakli mahsulotlarni buyurtma qiling</h2>
            <form
              className="about-cta-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <Search size={16} className="about-cta-search-icon" />
              <input type="email" placeholder="Email manzilingiz" />
              <button type="submit">Buyurtma berish</button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
