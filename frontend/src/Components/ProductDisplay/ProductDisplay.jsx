import { useContext, useState } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";

export const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, all_product } = useContext(ShopContext);
  const [mainImage, setMainImage] = useState(product.image);
  const updateMainImage = (newImage) => {
    setMainImage(newImage);
  };
  const handleAddToCart = () => {
    addToCart(product.id);
    if (product.quantity === 0) {
      alert("Product is out of stock");
    }
  };
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        {/* Liste des images de description */}
        <div className="productdisplay-img-list">
          <img
            src={product.imgdesc1}
            alt=""
            onClick={() => updateMainImage(product.imgdesc1)}
          />
          <img
            src={product.imgdesc2}
            alt=""
            onClick={() => updateMainImage(product.imgdesc2)}
          />
          <img
            src={product.imgdesc3}
            alt=""
            onClick={() => updateMainImage(product.imgdesc3)}
          />
          <img
            src={product.imgdesc4}
            alt=""
            onClick={() => updateMainImage(product.imgdesc4)}
          />
        </div>
        <div className="productdisplay-img">
          {/* utiliser l'image principale pour afficher */}
          <img
            className="productdisplay-main-img"
            src={mainImage}
            alt=""
            width={40}
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1> {product.name} </h1>
        <div className="productdisplay-right-stars">
          <div className="rating">
            <input defaultValue={5} name="rate" id="star5" type="radio" />
            <label title="text" htmlFor="star5" />
            <input defaultValue={4} name="rate" id="star4" type="radio" />
            <label title="text" htmlFor="star4" />
            <input
              defaultValue={3}
              name="rate"
              id="star3"
              type="radio"
              defaultChecked=""
            />
            <label title="text" htmlFor="star3" />
            <input defaultValue={2} name="rate" id="star2" type="radio" />
            <label title="text" htmlFor="star2" />
            <input defaultValue={1} name="rate" id="star1" type="radio" />
            <label title="text" htmlFor="star1" />
          </div>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            TND {product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            TND {product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div
          className="productdisplay-right-button"
          onClick={() => {
            handleAddToCart();
            all_product.forEach((product) => {
              if (product.id && product.quantity > -1) {
                product.quantity -= 1;
                console.log(product.quantity);
              }
            });
          }}
          style={{
            backgroundColor: product.quantity > 0 ? "" : "",
          }}
        >
          {product.quantity > 0 ? (
            <button className="button">
              <span>Ajouter au panier</span>
              <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <defs> </defs>{" "}
                  <g id="cart">
                    {" "}
                    <circle
                      r="1.91"
                      cy="20.59"
                      cx="10.07"
                      class="cls-1"
                    ></circle>{" "}
                    <circle
                      r="1.91"
                      cy="20.59"
                      cx="18.66"
                      class="cls-1"
                    ></circle>{" "}
                    <path
                      d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10"
                      class="cls-1"
                    ></path>{" "}
                    <polyline
                      points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91"
                      class="cls-1"
                    ></polyline>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
          ) : (
            <button className="button-rep">
              <span className="liquid" />
              <span className="btn-txt">Repture de stock</span>
            </button>
          )}
        </div>
        <p className="productdisplay-right-category">
          <span>Catégorie :</span> {product.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Quantité :</span> {product.quantity}
        </p>
      </div>
    </div>
  );
};
