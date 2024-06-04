import { useEffect, useState } from "react";
import "./ListOrder.css";

const ListOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
    const [undeliveredOrders, setUndeliveredOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);

  // Fonction pour récupérer toutes les commandes
  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/allorders");
      if (!response.ok) {
        throw new Error("Erreur réseau lors de la récupération des commandes.");
      }
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error("fetchInfo error:", error);
    }
  };

  const updateOrderDelivered = async (orderId) => {
    try {
      const orderToUpdate = allOrders.find((order) => order.id === orderId);
      if (!orderToUpdate) {
        throw new Error("Commande non trouvée.");
      }

      console.log("Sending update request for order ID:", orderId);
      const response = await fetch("http://localhost:4000/updateorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderToUpdate,
          delivred: true, // Mise à jour uniquement du champ delivred
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur réseau lors de la mise à jour de la commande.");
      }

      const updatedOrder = await response.json();
      console.log("Response from server:", updatedOrder);

      // Mise à jour de l'état local après la modification réussie
      setAllOrders(
        allOrders.map((order) =>
          order.id === orderId ? { ...order, delivred: true } : order
        )
      );

      console.log(`Commande ${orderId} a été marquée comme livrée.`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la commande:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      console.log("Sending delete request for order ID:", orderId);
      const response = await fetch("http://localhost:4000/removeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: orderId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur réseau lors de la suppression de la commande.");
      }

      const deletedOrder = await response.json();
      console.log("Response from server:", deletedOrder);

      // Mise à jour de l'état local après la suppression réussie
      setAllOrders(allOrders.filter((order) => order.id !== orderId));

      console.log(`Commande ${orderId} a été supprimée.`);
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande:", error);
    }
  };
  useEffect(() => {
    fetchInfo();
  }, []);
    useEffect(() => {
      // Filtrer les commandes non livrées et livrées
      const undelivered = allOrders.filter((order) => !order.delivred);
      const delivered = allOrders.filter((order) => order.delivred);
      // Mettre à jour les états locaux
      setUndeliveredOrders(undelivered);
      setDeliveredOrders(delivered);
    }, [allOrders]);

  const formatDate = (dateString) => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("fr-TN", options);
  };

  return (
    <div className="listorders">
      <div className="undelivred-order">
        <h1>Liste des Commandes non livrée</h1>
        {undeliveredOrders.map((order) => (
          <div key={order.id} className="listorder-details">
            <h2>
              Commande du Client: {order.fname} {order.lname}
            </h2>
            <p></p>
            <p>
              <strong>Adresse:</strong> {order.address}
            </p>
            <p>
              <strong>Téléphone:</strong> {order.phone}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(order.date)}
            </p>
            <h3>Les Produits</h3>
            {order.productinfo &&
              order.productinfo.map((product) => (
                <div key={product.id} className="products-details">
                  <p>
                    <strong>Nom:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Quantité:</strong> {product.quantity}
                  </p>
                  <p>
                    <strong>Prix:</strong> {product.price} TND
                  </p>
                </div>
              ))}
            <p>
              <strong>Prix total: </strong>
              {order.total}
            </p>
            <p>
              <strong>Etat :</strong>
              {order.delivred ? "Livrée" : "Non livrée"}
            </p>
            {!order.delivred ? (
              <button
                onClick={() => updateOrderDelivered(order.id)}
                className="btn-confirm"
              >
                Marquer comme livrée
              </button>
            ) : (
              <button disabled>Livraison confirmée</button>
            )}
            <button
              onClick={() => deleteOrder(order.id)}
              className="btn-delete"
            >
              Supprimer la commande
            </button>
          </div>
        ))}
      </div>

      <div className="delivred-order">
        <h1>Liste des Commandes non livrée</h1>
        {deliveredOrders.map((order) => (
          <div key={order.id} className="listorder-details">
            <h2>
              Commande du Client: {order.fname} {order.lname}
            </h2>
            <p></p>
            <p>
              <strong>Adresse:</strong> {order.address}
            </p>
            <p>
              <strong>Téléphone:</strong> {order.phone}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(order.date)}
            </p>
            <h3>Les Produits</h3>
            {order.productinfo &&
              order.productinfo.map((product) => (
                <div key={product.id} className="products-details">
                  <p>
                    <strong>Nom:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Quantité:</strong> {product.quantity}
                  </p>
                  <p>
                    <strong>Prix:</strong> {product.price} TND
                  </p>
                </div>
              ))}
            <p>
              <strong>Prix total: </strong>
              {order.total}
            </p>
            <p>
              <strong>Etat :</strong>
              {order.delivred ? "Livrée" : "Non livrée"}
            </p>
            {!order.delivred ? (
              <button
                onClick={() => updateOrderDelivered(order.id)}
                className="btn-confirm"
              >
                Marquer comme livrée
              </button>
            ) : (
              <button disabled>Livraison confirmée</button>
            )}
            <button
              onClick={() => deleteOrder(order.id)}
              className="btn-delete"
            >
              Supprimer la commande
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOrder;
