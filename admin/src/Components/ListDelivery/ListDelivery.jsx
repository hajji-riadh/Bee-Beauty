import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListDelivery.css";
import cross_icon from "../../assets/cross_icon.png";

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

  const remove_delivery = async (id) => {
    await fetch("http://localhost:4000/removedelivery", {
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
                <img
                  onClick={() => {
                    remove_delivery(delivery.id);
                  }}
                  src={cross_icon}
                  alt=""
                  className="listdelivery-remove-icon"
                />
              </div>
              <hr />
            </>
          );
        })}
        <Link to={"/adddelivery"} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <button className="btn-adddelivery">Ajouter un livreur</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ListDelivery;
