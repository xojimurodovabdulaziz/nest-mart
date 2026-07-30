import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import ContactHelp from "./ContactHelp";
import ContactMap from "./ContactMap";
import ContactLocations from "./ContactLocations";
import ContactForm from "./ContactForm";
import "./Contact.css";
import usePageTitle from "../../hooks/usePageTitle";

const Contact = () => {
  usePageTitle("Aloqa");

  const [focusId, setFocusId] = useState<string | null>(null);

  return (
    <Layout hideNewsletter>
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Pages</span>
          <span>/</span>
          <span>Contact</span>
        </div>

        <ContactHelp />
        <ContactMap focusId={focusId} />
        <ContactLocations onViewMap={setFocusId} />
        <ContactForm />
      </div>
    </Layout>
  );
};

export default Contact;
