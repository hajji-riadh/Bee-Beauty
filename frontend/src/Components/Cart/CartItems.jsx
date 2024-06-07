import { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";

export const CartItems = () => {
  const {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    emptyCart,
    getTotalCartAmount,
    getQuantityProduct,
  } = useContext(ShopContext);

  const [checkout, setCheckout] = useState(false);

  const incrementQuantity = (productId) => {
    addToCart(productId);
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

  const [orderForm, setOrderForm] = useState({
    fname: "",
    lname: "",
    address: "",
    city: "",
    Postcode: "",
    phone: "",
    email: "",
    remarques: "",
    product: [],
    total: getTotalCartAmount(),
  });

  useEffect(() => {
    const cartToOrderProducts = () => {
      return Object.entries(cartItems)
        .filter(([id, quantity]) => quantity > 0)
        .map(([id, quantity]) => {
          const product = all_product.find(
            (product) => product.id.toString() === id
          );
          if (!product) {
            console.error(
              `Produit avec l'id ${id} n'a pas été trouvé dans all_product`
            );
            return null;
          }
          return {
            id: product.id,
            name: product.name,
            quantity: getQuantityProduct(id),
            price: product.new_price,
            image: product.image,
          };
        })
        .filter(Boolean); // Filtre les valeurs nulles
    };

    if (Object.keys(cartItems).length > 0) {
      setOrderForm((prevForm) => ({
        ...prevForm,
        product: cartToOrderProducts(),
        total: getTotalCartAmount(),
      }));
    }
  }, [cartItems, all_product, getTotalCartAmount, getQuantityProduct]);

  const handleInputChange = (e) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!isUserAuthenticated()) {
      return alert("Veuillez vous connecter pour passer votre commande");
    }

    if (Object.keys(cartItems).length === 0) {
      return alert("Votre panier est vide !");
    }

    try {
      const productsForOrder = Object.entries(cartItems)
        .map(([id, quantity]) => {
          const product = all_product.find((p) => p.id.toString() === id);
          if (!product) {
            console.error(
              `Produit avec l'id ${id} n'a pas été trouvé dans all_product`
            );
            return null;
          }
          return {
            id: product.id,
            quantity: quantity,
          };
        })
        .filter(Boolean);

      // Ajout de la commande
      const addOrderResponse = await fetch("http://localhost:4000/addorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderForm),
      });

      if (!addOrderResponse.ok) {
        throw new Error("Erreur lors de la commande");
      }

      // Confirmation de la commande
      const orderConfirmation = await addOrderResponse.json();
      alert("Commande effectuée avec succès !");
      console.log("Commande effectuée avec succès :", orderConfirmation);

      // Mise à jour de la quantité des produits après la confirmation de la commande
      const updatePromises = productsForOrder.map(async (product) => {
        const updatedQuantity =
          all_product.find((p) => p.id.toString() === product.id.toString())
            .quantity - product.quantity;

        const updateResponse = await fetch(
          "http://localhost:4000/updateproduct",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: product.id,
              quantity: updatedQuantity,
            }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error("Erreur lors de la mise à jour des quantités");
        }
      });

      await Promise.all(updatePromises);

      // Réinitialisation du panier et du formulaire
      emptyCart();
      setCheckout(false);
      setOrderForm({
        fname: "",
        lname: "",
        address: "",
        city: "",
        Postcode: "",
        phone: "",
        email: "",
        remarques: "",
        product: [],
        total: 0,
      });
    } catch (error) {
      console.error(error);
      alert("Erreur: " + error.message);
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
              <button
                className="delete-button"
                onClick={() => removeFromCart(product.id)}
              >
                <svg className="delete-svgIcon" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>
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
          {checkout ? (
            <form onSubmit={handleOrderSubmit} className="form-container">
              <input
                type="text"
                name="fname"
                placeholder="Prénom"
                value={orderForm.fname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lname"
                placeholder="Nom"
                value={orderForm.lname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Adresse"
                value={orderForm.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="city"
                placeholder="Ville"
                value={orderForm.city}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="Postcode"
                placeholder="Code Postal"
                value={orderForm.Postcode}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Téléphone"
                value={orderForm.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={orderForm.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="remarques"
                placeholder="Remarques"
                value={orderForm.remarques}
                onChange={handleInputChange}
              />
              <button type="submit">Commander</button>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
