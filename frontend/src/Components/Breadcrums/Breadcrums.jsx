import React from "react";
import "./Breadcrums.css";
import arrw_icon from "../Assets/breadcrum_arrow.png";
import { Link } from "react-router-dom";

export const Breadcrums = (props) => {
  const { product } = props;
  return (
    <>
      <div className="breadcrum">
        <Link to="/" style={{ textDecoration: "none" }}>
          Accueil
        </Link>
        <img src={arrw_icon} alt="" /> Achat <img src={arrw_icon} alt="" />
        {product.category} <img src={arrw_icon} alt="" /> {product.name}
      </div>
    </>
  );
};
