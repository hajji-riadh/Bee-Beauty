import { useState } from "react";
import "./CSS/Login.css";

export const Login = () => {
  const [state, setState] = useState("Connexion");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    console.log("login executed", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("signup executed", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "S'Inscrire" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          {state === "S'Inscrire" ? (
            <input
              name="phone"
              value={formData.phone}
              onChange={changeHandler}
              type="text"
              placeholder="Your number"
            />
          ) : (
            <></>
          )}
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          onClick={() => {
            state === "Connexion" ? login() : signup();
          }}
        >
          Continuer
        </button>

        {state === "S'Inscrire" ? (
          <p className="loginsignup-login">
            Vous avez déjà un compte ?
            <span
              onClick={() => {
                setState("Connexion");
              }}
            >
              Connectez-vous ici
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Créer un compte ?
            <span
              onClick={() => {
                setState("S'Inscrire");
              }}
            >
              Cliquez ici
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            En continuant, j'accepte les conditions d'utilisation et la
            politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  );
};
