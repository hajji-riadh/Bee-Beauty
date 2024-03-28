import "./Item.css";
import { Link } from "react-router-dom";

export const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">TND {props.new_price}</div>
        <div className="item-price-old">TND {props.old_price}</div>
      </div>
    </div>
  );
};
