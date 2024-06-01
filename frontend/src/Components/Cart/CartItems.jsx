import { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import Commander from "../Commander/Commander";

export const CartItems = () => {
  const {
    all_product,
    cartItems,
    getTotalCartAmount,
    setCartItems,
    setAllProduct,
  } = useContext(ShopContext);
  const [checkout, setCheckout] = useState(false);
  const emptyCart = () => {
    setCartItems({});
    all_product.forEach((product) => {
      product.quantity += cartItems[product.id] || 0;
    });
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

const removeFromCart = (productId) => {
  setCartItems((prevCartItems) => {
    const updatedCartItems = { ...prevCartItems };
    delete updatedCartItems[productId];
    return updatedCartItems;
  });

  setAllProduct((prevAllProduct) => {
    return prevAllProduct.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity + (cartItems[productId] || 0),
        };
      }
      return product;
    });
  });
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
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img className="carticon-product-icon" src={e.image} alt="" />
                <p>{e.name}</p>
                <p>TND {e.new_price}</p>
                <div className="cartitems-quantity">{cartItems[e.id]}</div>
                <p>TND {e.new_price * cartItems[e.id]}</p>
                <img
                  className="carticon-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                    all_product.forEach((product) => {
                      if (product.id) {
                        product.quantity += 1;
                        console.log(product.quantity);
                      }
                    });
                  }}
                  alt=""
                />
              </div>
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
          <button
            className="btn-vider-panier"
            type="button"
            onClick={emptyCart}
          >
            Vider le Panier
          </button>
          {checkout && <Commander />}
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
