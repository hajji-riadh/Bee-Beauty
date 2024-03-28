import { useContext, useRef, useState } from "react";
import "./Navbar.css";

import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_mobil.png";

export const Navbar = () => {

  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };


  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>BEAUTY-SHOP</p>
      </div>

      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />

      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            ACCUEIL
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("visages");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/visages">
            SOIN VISAGE
          </Link>
          {menu === "visages" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("makeups");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="makeups">
            MAQUILLAGE
          </Link>
          {menu === "makeups" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("champoins");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="champoins">
            DOUCHE
          </Link>
          {menu === "champoins" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("parfums");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="parfums">
            PARFUMS
          </Link>
          {menu === "parfums" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button>Log in</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};
