import "./AddUser.css";
import { useState } from "react";

const AddUser = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
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
        data.success ? alert("Utilisateur ajouter") : alert("Utilisateur existe !");
      });
  };
  return (
    <div className="add-user">
      <div className="adduser-itemfield">
        <p>{`Nom d'Utilisateur`}</p>
        <input
          type="text"
          value={userDetails.name}
          onChange={changeHandler}
          name="name"
          placeholder="Nom d'utilisateur"
          pattern="[A-Za-z0-9]{3,}"
          required
        />
        <p>Email de Utilisateur</p>
        <input
          type="text"
          value={userDetails.email}
          onChange={changeHandler}
          name="email"
          placeholder="Email d'utilisateur"
          required
        />
        <p>{`Telephone d'Utilisateur`}</p>
        <input
          type="number"
          value={userDetails.phone}
          onChange={changeHandler}
          name="phone"
          placeholder="Telephone d'utilisateur"
          pattern="[0-9]{8,}"
          required
        />
        <p>{`Mot de passe de l'utilisateur`}</p>
        <input
          type="password"
          value={userDetails.password}
          onChange={changeHandler}
          name="password"
          placeholder="Mot de passe de user"
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
