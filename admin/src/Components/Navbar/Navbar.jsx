import "./Navbar.css";
import { Link } from "react-router-dom"
import navlogo from "../../assets/nav_logo_admin.png";
import navProfile from "../../assets/BeeCoders.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/admin"><img src={navlogo} alt="" className="nav-logo" /></Link>
      <Link to="/login"><button className="btn_out">Déconnexion</button></Link>
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
