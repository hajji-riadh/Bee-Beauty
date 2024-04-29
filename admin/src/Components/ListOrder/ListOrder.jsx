import { useState } from "react";
import "./ListOrder.css";
import { useEffect } from "react";

const ListOrder = () => {
  const [allOrder, setAllOrder] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allorders")
      .then((res) => res.json())
      .then((data) => {
        setAllOrder(data);
      });
  };

    useEffect(() => {
      fetchInfo();
    }, []);

  return (
    <div className="listorder">
      <h3>Listes des commandes</h3>
      <div className="listorder-container">
        <div className="listorder-item">
          <p>Nom du client</p>
          <p>Nom du produit</p>
          <p>Prix</p>
          <p>Quantité</p>
        </div>
      </div>
      <div className="listorder-allorder">
        {allOrder.map((order, index) => {
          return (
            <div key={index} className="listorder-item">
              <p>{order.name}</p>
              <p>{order.product}</p>
              <p>{order.price}</p>
              <p>{order.quantity}</p>
              <div className="removeuser">
                <button
                  className="btn-removeuser"
                  onClick={() => remove_order(order.id)}
                >
                  Retirer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListOrder;
