import "./AddUser.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import back_icon from "../../assets/back_icon.png";


const AddUser = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const Add_user = async () => {
    console.log(userDetails);
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success
          ? alert("L'utilisateur ajouter avec succée ")
          : alert("Utilisateur déja existe !");
      });
  };
  return (
    <div className="add-user">
      <div className="back">
        <Link to={"/allusers"} style={{ textDecoration: "none" }}>
          <img
            src={back_icon}
            width="30"
            alt=""
          />
        </Link>
      </div>
      <div className="adduser-itemfield">
        <p>Nom</p>
        <input
          type="text"
          value={userDetails.username}
          onChange={changeHandler}
          name="username"
          placeholder="Nom d'utilisateur"
          pattern="[A-Za-z0-9]{3,}"
          required
        />
        <p>Email</p>
        <input
          type="text"
          value={userDetails.email}
          onChange={changeHandler}
          name="email"
          placeholder="Email d'utilisateur"
          required
        />
        <p>Telephone</p>
        <input
          type="text"
          value={userDetails.phone}
          onChange={changeHandler}
          name="phone"
          placeholder="Telephone d'utilisateur"
          pattern="[0-9]{8,}"
          required
        />
        <p>Mot de passe</p>
        <input
          type="password"
          value={userDetails.password}
          onChange={changeHandler}
          name="password"
          placeholder="Mot de passe d'utilisateur"
          pattern="[A-Za-z0-9]{4,}"
          required
        />
      </div>

      <button
        onClick={() => {
          Add_user();
        }}
        className="adduser-btn"
      >
        AJOUTER
      </button>
    </div>
  );
};

export default AddUser;
