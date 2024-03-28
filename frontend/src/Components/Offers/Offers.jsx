import "./Offers.css";
import exclusive_image from "../Assets/douche_collection.png";

export const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Offres exclusives pour vous</h1>
        <p>UNIQUEMENT SUR LES PRODUITS DOUCHES</p>
        <button>Vérifie maintenant</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};
