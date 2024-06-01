import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import { Item } from "../Components/Item/Item";

export const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
    const [visible, setVisible] = useState(12);

    const showMoreItems = () => {
      setVisible((prevValue) => prevValue + 12);
    };
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Affichage des</span> produits
        </p>
        <div className="shopcategory-sort">
          Trier par <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.slice(0, visible).map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
          return null;
        })}
      </div>
      {visible < all_product.length && (
        <button className="shopcategory-loadmore" onClick={showMoreItems}>
          Explorez Plus
        </button>
      )}
    </div>
  );
};
