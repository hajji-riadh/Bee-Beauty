import "./ListOrder.css";
import { useEffect, useState } from "react";

const ListOrder = () => {
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
    <div className="list-orders">
      <h1>{`Liste des commandes`}</h1>
      <div className="listorders-format-main">
        <p>Nom de client</p>
        <p>Nom de produit</p>
        <p>Image</p>
        <p>Quantité</p>
        <p>Prix total</p>
        <p>Téléphone</p>
        <p>Confirmer</p>
        <p>Annuler</p>
      </div>
      <div className="listorders-allorders">
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
                className="listorders-format-main listorders-format"
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
                        className="listorders-format-main listorders-format"
                      >
                        <p>{user.name}</p>
                        <p>{`${product.name}`}</p>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="listorders-product-icon"
                        />
                        <p>{`${quantity}`}</p>
                        <p>{`${product.new_price * quantity} TND`}</p>
                        <p>{user.phone}</p>
                        <button
                          // ononClick={() => {
                          //   confirm_order(product.id);
                          // }}
                          className="listorders-confirm-btn"
                        >
                          Confirmer
                        </button>
                        <button
                          // ononClick={() => {
                          //   confirm_order(product.id);
                          // }}
                          className="listorerds-cancel-btn"
                        >
                          Annuler
                        </button>
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
export default ListOrder;
