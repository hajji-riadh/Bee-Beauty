import "./ListReservation.css";
import { useEffect, useState } from "react";

const ListReservation = () => {
  const [users, setUsers] = useState([]);
  const [all_product, setAll_Product] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/allusers", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "admin-token": `${localStorage.getItem("auth-token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="ListReservation">
      <h1>{`Liste des réservations`}</h1>
      <div className="ListReservation-allorders">
        <hr />
        {users.map((user) => {
          const totalProducts = Object.values(user.cartData).reduce(
            (a, b) => a + b,
            0
          );
          return (
            totalProducts > 0 && (
              <div
                key={user.id}
                className="ListReservation-format-main ListReservation-format"
              >
                {Object.entries(user.cartData).map(([productId, quantity]) => {
                  const product = all_product.find(
                    (product) => product.id == productId
                  );
                  return (
                    product &&
                    quantity > 0 && (
                      <div
                        key={productId}
                        className="ListReservation-format-main ListReservation-format"
                      >
                        <p><span>Client :</span>{user.username}</p>
                        <p><span>Produit : </span>{`${product.name}`}</p>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="ListReservation-product-icon"
                        />
                        <p><span>Quantité : </span>{`${quantity}`}</p>
                        <p><span>Total : </span>{`${product.new_price * quantity} TND`}</p>
                        <p><span>Numéro de téléphone : </span>{user.phone}</p>
                        <p><span>Date : </span>{new Date().toLocaleDateString("fr-TN")}</p>
                      </div>
                    )
                  );
                })}
                <hr />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
export default ListReservation;
