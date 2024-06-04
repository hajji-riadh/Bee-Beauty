import { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
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
    if(product.quantity === 0){
      alert("Product is out of stock")
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
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(173)</p>
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
      <button
        onClick={()=> {
          handleAddToCart()
           all_product.forEach((product) => {
              if (product.id && product.quantity > -1) {
                product.quantity -= 1;
                console.log(product.quantity);
              }
            });
        }}
        disabled={product.quantity === 0}
      >
        {product.quantity > 0 ? "AJOUTER AU PANIER" : "RUPTURE DE STOCK"}
      </button>
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
