import { useState } from "react";
import { subscribeNewsletter } from "../../api/vendors";
import "./Hero.css";
import "./HeroSubscribe.css";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    try {
      await subscribeNewsletter(email.trim());
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="hero">
      <div className="container hero-inner">
        <h1>Fresh Vegetables <br />
          Big discount</h1>
        <p className="hero-text">Sign up for the daily newsletter</p>

        <form className="hero-subscribe" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "..." : "Subscribe"}
          </button>
        </form>

        {status === "done" && <p className="hero-subscribe-msg success">Obuna bo'ldingiz!</p>}
        {status === "error" && <p className="hero-subscribe-msg error">Xatolik yuz berdi</p>}

        <div className="hero-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default Hero;