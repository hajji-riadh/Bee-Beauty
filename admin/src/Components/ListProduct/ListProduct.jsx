import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1>Liste de tous les produits</h1>
      <div className="listproduct-format-main">
        <p>Produits</p>
        <p>Titre</p>
        <p>Ancien Prix</p>
        <p>Nouveau Prix</p>
        <p>Categorie</p>
        <p>Quantité</p>
        <p>Retirer</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={product.image}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>TND {product.old_price}</p>
                <p>TND {product.new_price}</p>
                <p>{product.category}</p>
                <p>{product.quantity}</p>
                <img
                  onClick={() => {
                    remove_product(product.id);
                  }}
                  src={cross_icon}
                  alt=""
                  className="listproduct-remove-icon"
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
      <div className="addproduct">
        <h1>Pour ajouter un produit :</h1>
        <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <button className="btn-addproduct">Ajouter un produit</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ListProduct;
