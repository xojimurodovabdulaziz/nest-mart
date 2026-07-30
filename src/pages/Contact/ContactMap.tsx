import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./ContactMap.css";

const pinIcon = L.divIcon({
  className: "map-pin",
  html: '<div class="map-pin-dot"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export const LOCATIONS = [
  { id: "office", label: "Bosh ofis", lat: 41.311081, lng: 69.240562, address: "Amir Temur ko'chasi 1, Toshkent, O'zbekiston" },
  { id: "warehouse", label: "Ombor", lat: 41.2995, lng: 69.2401, address: "Chilonzor tumani, Toshkent, O'zbekiston" },
  { id: "shop", label: "Do'kon", lat: 41.326, lng: 69.228, address: "Yunusobod tumani, Toshkent, O'zbekiston" },
];

function FlyTo({ target }: { target: { lat: number; lng: number } | null }) {
  const map = useMap();
  if (target) map.flyTo([target.lat, target.lng], 14, { duration: 0.8 });
  return null;
}

const ContactMap = ({ focusId }: { focusId: string | null }) => {
  const target = LOCATIONS.find((l) => l.id === focusId) || null;
  const mapRef = useRef(null);

  return (
    <div className="contact-map">
      <MapContainer center={[41.311081, 69.240562]} zoom={12} ref={mapRef} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {LOCATIONS.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={pinIcon}>
            <Popup>
              <strong>{loc.label}</strong>
              <br />
              {loc.address}
            </Popup>
          </Marker>
        ))}
        <FlyTo target={target} />
      </MapContainer>
    </div>
  );
};

export default ContactMap;
