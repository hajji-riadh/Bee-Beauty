import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
import users_icon from "../../assets/users.png";
import list_provider_icon from "../../assets/fournisseurs_icon.jpg";
import list_order_icon from "../../assets/list_commandes.jpg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Ajouter un produit</p>
        </div>
      </Link>

      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Liste des produits</p>
        </div>
      </Link>

      <Link to={"/allusers"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={users_icon} alt="" width={30} />
          <p>Liste des utilisateurs</p>
        </div>
      </Link>

      <Link to={"/listdelivery"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_provider_icon} alt="" width={30} />
          <p>Liste des livreurs</p>
        </div>
      </Link>

      <Link to={"/listorder"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_order_icon} alt="" width={30} />
          <p>Liste des Orders</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
