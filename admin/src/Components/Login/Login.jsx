import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginAdmin = ({ setIsAuthenticated }) => {
  const [state, setState] = useState("Connexion");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    token: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/loginadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem("beeAdmin", responseData.token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError("Informations incorrectes. Veuillez réessayer.");
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };

   const signup = async () => {
     try {
       const response = await fetch("http://localhost:4000/signupadmin", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       });
       const responseData = await response.json();
       if (responseData.success) {
         localStorage.setItem("beeAdmin", responseData.token);
         setIsAuthenticated(true);
         navigate("/");
       } else {
         setError(responseData.errors.join(", "));
       }
     } catch (error) {
       setError("Une erreur s'est produite lors de l'inscription.");
     }
   };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="loginsignup-fields">
          {state === "S'Inscrire" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              autoComplete="off"
              type="text"
              placeholder="Votre nom"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            autoComplete="off"
            type="email"
            placeholder="Email Address"
          />
          {state === "S'Inscrire" ? (
            <input
              name="token"
              value={formData.token}
              onChange={changeHandler}
              autoComplete="off"
              type="text"
              placeholder="Entrer le code de sécuriter"
            />
          ) : (
            <></>
          )}
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            autoComplete="off"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          onClick={() => {
            setError("votre informations et incorrect !");
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
      </div>
    </div>
  );
};

export default LoginAdmin;
