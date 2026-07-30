import { MapPin, Phone, Mail } from "lucide-react";
import { LOCATIONS } from "./ContactMap";
import "./ContactLocations.css";

interface Props {
  onViewMap: (id: string) => void;
}

const ContactLocations = ({ onViewMap }: Props) => {
  return (
    <div className="contact-locations">
      {LOCATIONS.map((loc) => (
        <div className="contact-location-card" key={loc.id}>
          <span className="contact-location-icon" aria-hidden="true">
            <MapPin size={18} />
          </span>
          <h3>{loc.label}</h3>
          <p className="contact-location-address">{loc.address}</p>
          <p>
            <Phone size={13} /> <a href="tel:+998712000000">+998 71 200-00-00</a>
          </p>
          <p>
            <Mail size={13} /> <a href="mailto:sale@nest.com">sale@nest.com</a>
          </p>
          <button type="button" onClick={() => onViewMap(loc.id)}>
            Xaritada ko'rish
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactLocations;
