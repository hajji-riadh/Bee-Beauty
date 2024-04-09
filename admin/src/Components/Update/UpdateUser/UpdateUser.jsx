import "./UpdateUser.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import back_icon from "../../../assets/back_icon.png";

const UpdateUser = () => {
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
  const Update_user = async () => {
    console.log(userDetails);
    await fetch("http://localhost:4000/updateuser", {
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
          ? alert("User with this email not found")
          : alert("User updated successfully");
      });
  };
  return (
    <div className="update-user">
      <div className="back">
        <Link to={"/allusers"} style={{ textDecoration: "none" }}>
          <img
            src={back_icon}
            width="30"
            alt=""
          />
        </Link>
      </div>
      <div className="updateuser-itemfield">
        <p>Nom</p>
        <input
          type="text"
          value={userDetails.name}
          onChange={changeHandler}
          name="name"
          placeholder="Nom d'utilisateur"
          pattern="[A-Za-z0-9]{3,}"
          required
        />
        <p>Email</p>
        <input
          type="email"
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
          placeholder="Mot de passe de user"
          pattern="[A-Za-z0-9]{4,}"
          required
        />
      </div>

      <button
        onClick={() => {
          Update_user();
        }}
        className="updateuser-btn"
      >
        MODIFIER
      </button>
    </div>
  );
};

export default UpdateUser;
