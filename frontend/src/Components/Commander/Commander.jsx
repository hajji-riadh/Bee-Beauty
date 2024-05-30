import React, { useState } from "react";
import "./Commander.css";

const Commander = () => {
  const [order, setOrder] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    ville: "",
    codePostal: "",
    numeroTelephone: "",
    email: "",
    remarques: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Liste des villes de Tunisie
  const villes = [
    "Tunis",
    "Sfax",
    "Sousse",
    "Ettadhamen",
    "Kairouan",
    "Gabès",
    "Bizerte",
    "Aryanah",
    "Gafsa",
    "El Mourouj",
    "La Marsa",
    "Hammamet",
    "Monastir",
    "La Goulette",
    "Kairouan",
    "Tozeur",
    "Mahdia",
    "Gafsa",
    "Kasserine",
    "Sidi Bou Saïd",
    "El Jem",
    "Hergla",
    "Nabeul",
    "Houmt Souk",
    "Ghomrassen",
    "Gammarth",
    "Kesra",
    "Douz",
    "Zarzis",
    "Médenine",
  ];

  const handleVillesChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez gérer la soumission du formulaire, par exemple en envoyant les données à un serveur
    console.log(order);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Informations de livraison</h2>
        <label>
          Nom:
          <input
            type="text"
            name="nom"
            value={order.nom}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Prénom:
          <input
            type="text"
            name="prenom"
            value={order.prenom}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Adresse:
          <input
            type="text"
            name="adresse"
            value={order.adresse}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <select
            name="ville"
            value={order.ville}
            onChange={handleVillesChange}
            required
          >
            {villes.map((ville) => (
              <option key={ville} value={ville}>
                {ville}
              </option>
            ))}
          </select>
        </label>
        <label>
          Code Postal:
          <input
            type="text"
            name="codePostal"
            value={order.codePostal}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Numéro de téléphone:
          <input
            type="tel"
            name="numeroTelephone"
            value={order.numeroTelephone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={order.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Remarques:
          <textarea
            name="remarques"
            value={order.remarques}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Confirmer la commande</button>
      </form>
    </div>
  );
};

export default Commander;
