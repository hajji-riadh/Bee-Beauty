import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

export const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Produit</p>
        <p>Titre</p>
        <p>Prix</p>
        <p>Quantité</p>
        <p>Total</p>
        <p>Supprimer</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img className="carticon-product-icon" src={e.image} alt="" />
                <p>{e.name}</p>
                <p>TND {e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>TND {e.new_price * cartItems[e.id]}</p>
                <img
                  className="carticon-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>totaux du panier</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Sous-Total</p>
              <p>TND {getTotalCartAmount()}</p>
            </div>
            <div className="cartitems-total-item">
              <p>Frais d'Expédition</p>
              <p>Gratuit</p>
            </div>
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>TND {getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PASSEZ À LA CAISSE</button>
        </div>
        <div className="cartitems-promocode">
          <p>Si vous avez un code promo, entrez-le ici</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Soumettre</button>
          </div>
        </div>
      </div>
    </div>
  );
};
