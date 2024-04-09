import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import back_icon from "../../assets/back_icon.png";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "makeup",
    quantity: "",
    new_price: "",
    old_price: "",
    description: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product added") : alert("Failed");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="back">
        <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
          <img src={back_icon} width="30" alt="" />
        </Link>
      </div>
      <div className="addproduct-itemfield">
        <p>Titre de Produit</p>
        <input
          type="text"
          value={productDetails.name}
          onChange={changeHandler}
          name="name"
          placeholder="Nom de Produit"
          pattern="[A-Za-z0-9]{3,}"
          required
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Prix</p>
          <input
            type="text"
            value={productDetails.old_price}
            onChange={changeHandler}
            name="old_price"
            placeholder=" 0 TND "
            pattern="[0-9]"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Nouvelle Prix</p>
          <input
            type="text"
            value={productDetails.new_price}
            onChange={changeHandler}
            name="new_price"
            placeholder=" 0 TND "
            pattern="[0-9]{1,}"
            required
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Categorie de Produit</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="makeup">makeup</option>
          <option value="visage">visage</option>
          <option value="douche">douche</option>
          <option value="parfum">parfum</option>
        </select>
        <input
          type="number"
          value={productDetails.quantity}
          onChange={changeHandler}
          name="quantity"
          placeholder=" Qantité = 0 "
          pattern="[0-9]{1,}"
          required
        />
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <div className="addproduct-itemfield-desc">
        <p>Description de Produit</p>
        <input
          type="text"
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Description de Product"
          pattern="[A-Za-z0-9]{4,}"
          required
        />
      </div>

      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        AJOUTER
      </button>
    </div>
  );
};

export default AddProduct;
