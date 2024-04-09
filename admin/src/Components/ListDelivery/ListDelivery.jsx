import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListDelivery.css";

const ListDelivery = () => {
  const [alldelivery, setAlldelivery] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/alldelivery")
      .then((res) => res.json())
      .then((data) => {
        setAlldelivery(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_delivery = async (email) => {
    await fetch("http://localhost:4000/removedelivery", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-delivery">
      <h1>Liste de tous les Livreurs</h1>
      <div className="listdelivery-format-main">
        <p>Nom</p>
        <p>Email</p>
        <p>Ville</p>
        <p>Numéro</p>
        <p>Description</p>
        <p>Retirer</p>
      </div>
      <div className="listdelivery-alldelivery">
        <hr />
        {alldelivery.map((delivery, i) => {
          return (
            <>
              <div
                key={i}
                className="listdelivery-format-main listdelivery-format"
              >
                <p>{delivery.name}</p>
                <p>{delivery.email}</p>
                <p>{delivery.city}</p>
                <p>{delivery.phone}</p>
                <p>{delivery.description}</p>
                <div className="removeuser">
                  <button
                    className="btn-removeuser"
                    onClick={() => remove_delivery(delivery.email)}
                  >
                    Retirer
                  </button>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
      <div className="adddelivery">
        <h1>Pour ajouter un nouvelle Livreur : </h1>
        <Link to={"/adddelivery"} style={{ textDecoration: "none" }}>
          <button className="btn-adddelivery">Ajouter un livreur</button>
        </Link>
      </div>
      <div className="updatedelivery">
        <h1>Pour modifier un Livreur : </h1>
        <Link to={"/updatedelivery"} style={{ textDecoration: "none" }}>
          <button className="btn-updatedelivery">Modifier un livreur</button>
        </Link>
      </div>
    </div>
  );
};

export default ListDelivery;
