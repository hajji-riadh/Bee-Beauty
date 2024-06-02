import { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import Commander from "../Commander/Commander";

export const CartItems = () => {
  const {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);
  const [checkout, setCheckout] = useState(false);

  const incrementQuantity = (productId) => {
    addToCart(productId, 1);
  };

  const isUserAuthenticated = () => {
    const token = localStorage.getItem("auth-token");
    return token != null;
  };

  const handleCheckout = () => {
    if (!isUserAuthenticated()) {
      alert("Veuillez vous connecter pour passer votre commande");
    } else if (Object.keys(cartItems).length === 0) {
      alert("Votre panier est vide !");
    } else if (getTotalCartAmount() > 0) {
      setCheckout(true);
    }
  };

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
      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id} className="cartitems-format">
              <img
                className="carticon-product-icon"
                src={product.image}
                alt={product.name}
              />
              <p>{product.name}</p>
              <p>TND {product.new_price}</p>
              <div className="quantity-controls">
                <button
                  className="DecrimentQuantity"
                  onClick={() => removeFromCart(product.id)}
                >
                  -
                </button>
                <span>{cartItems[product.id]}</span>
                <button onClick={() => incrementQuantity(product.id)}>+</button>
              </div>
              <p>TND {product.new_price * cartItems[product.id]}</p>
              <img
                className="carticon-remove-icon"
                src={remove_icon}
                onClick={() => removeFromCart(product.id)}
                alt="Supprimer"
              />
            </div>
          );
        }
        return null;
      })}
      <hr />
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
          <button
            className="btn-commander"
            type="button"
            onClick={handleCheckout}
          >
            PASSEZ À LA CAISSE
          </button>
          {checkout && <Commander />}
        </div>
      </div>
    </div>
  );
};
