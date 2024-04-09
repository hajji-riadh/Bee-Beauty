import "./UpdateDelivery.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import back_icon from "../../../assets/back_icon.png";

const UpdateDelivery = () => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    description: "",
  });

  const changeHandler = (e) => {
    setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
  };
  const Update_delivery = async () => {
    console.log(deliveryDetails);
    await fetch("http://localhost:4000/updatedelivery", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryDetails),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success
          ? alert("Delivery with this email not found")
          : alert("Delivery updated successfully");
      });
  };

  return (
    <div className="update-delivery">
      <div className="back">
        <Link to={"/listdelivery"} style={{ textDecoration: "none" }}>
          <img
            src={back_icon}
            width="30"
            alt=""
          />
        </Link>
      </div>
      <div className="updatedelivery-itemfield">
        <p>Nom</p>
        <input
          type="text"
          value={deliveryDetails.name}
          onChange={changeHandler}
          name="name"
          placeholder="Nom de livreur"
          pattern="[A-Za-z0-9]{3,}"
          required
        />
        <p>Email</p>
        <input
          type="email"
          value={deliveryDetails.email}
          onChange={changeHandler}
          name="email"
          placeholder="Email de livreur"
          required
        />
        <p>Telephone</p>
        <input
          type="text"
          value={deliveryDetails.phone}
          onChange={changeHandler}
          name="phone"
          placeholder="Telephone de livreur"
          pattern="[0-9]{8,}"
          required
        />
        <p>Ville</p>
        <input
          type="text"
          value={deliveryDetails.city}
          onChange={changeHandler}
          name="city"
          placeholder="ville de delivery"
          pattern="[A-Za-z0-9]{3,}"
          required
        />
      </div>

      <div className="adddelivery-itemfield-desc">
        <p>Description</p>
        <input
          type="text"
          value={deliveryDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Description de delivery"
          pattern="[A-Za-z0-9]{4,}"
          required
        />
      </div>

      <button
        onClick={() => {
          Update_delivery();
        }}
        className="updatedelivery-btn"
      >
        MODIFIER
      </button>
    </div>
  );
};

export default UpdateDelivery;
