import React from "react";
import "./NewsLetter.css"

export const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Recevez des offres exclusives sur votre e-mail</h1>
      <p>Abonnez-vous à notre lettre d'information et restez informé</p>
      <div>
        <input type="email" placeholder="Your Email id" />
        <button>S'abonner</button>
      </div>
    </div>
  );
};
