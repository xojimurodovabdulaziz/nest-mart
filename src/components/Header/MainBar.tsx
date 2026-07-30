import { Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from "../../assets/Nest.svg";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import SearchBar from "./SearchBar";
import LocationSelect from "./LocationSelect";
import HeaderIcons from "./HeaderIcons";
import VendorTeamDropdown from "./VendorTeamDropdown";
import "./MainBar.css";

const MainBar = () => {
  const token = localStorage.getItem("access_token");
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();
  const { refreshCompare } = useCompare();

  useEffect(() => {
    if (token) {
      refreshCart();
      refreshWishlist();
      refreshCompare();
    }
  }, [token, refreshCart, refreshWishlist, refreshCompare]);

  return (
    <div className="mainbar">
      <div className="container mainbar-inner">
        <Link to="/" className="logo">
          <img src={Logo} alt="Nest" />
        </Link>

        <SearchBar />

        <VendorTeamDropdown />

        <div className="mainbar-right">
          <LocationSelect />
          <HeaderIcons />
        </div>
      </div>
    </div>
  );
};

export default MainBar;
