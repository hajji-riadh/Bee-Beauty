import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import back_icon from "../../assets/back_icon.png";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [imgdesc1, setImgdesc1] = useState(null);
  const [imgdesc2, setImgdesc2] = useState(null);
  const [imgdesc3, setImgdesc3] = useState(null);
  const [imgdesc4, setImgdesc4] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    imgdesc1: "",
    imgdesc2: "",
    imgdesc3: "",
    imgdesc4: "",
    category: "makeup",
    quantity: "",
    new_price: "",
    old_price: "",
    description: "",
  });
  const imageHandler = (e) => {
    const { name, files } = e.target;
    if (name === "image") {
      setImage(files[0]);
    } else if (name === "imgdesc1") {
      setImgdesc1(files[0]);
    } else if (name === "imgdesc2") {
      setImgdesc2(files[0]);
    } else if (name === "imgdesc3") {
      setImgdesc3(files[0]);
    } else if (name === "imgdesc4") {
      setImgdesc4(files[0]);
    }
  };
  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

const Add_Product = async () => {
  console.log(productDetails);
  let product = productDetails;
  let formData = new FormData();
  formData.append("image", image);
  formData.append("imgdesc1", imgdesc1);
  formData.append("imgdesc2", imgdesc2);
  formData.append("imgdesc3", imgdesc3);
  formData.append("imgdesc4", imgdesc4);

  try {
    const uploadResponse = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Upload failed:", errorText);
      alert("Le téléchargement des images a échoué.");
      return;
    }

    const uploadData = await uploadResponse.json();

    if (uploadData.success) {
      product.image = uploadData.images.image;
      product.imgdesc1 = uploadData.images.imgdesc1;
      product.imgdesc2 = uploadData.images.imgdesc2;
      product.imgdesc3 = uploadData.images.imgdesc3;
      product.imgdesc4 = uploadData.images.imgdesc4;

      const addProductResponse = await fetch(
        "http://localhost:4000/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (!addProductResponse.ok) {
        const errorText = await addProductResponse.text();
        console.error("Add product failed:", errorText);
        alert("L'ajout du produit a échoué.");
        return;
      }

      const addProductData = await addProductResponse.json();

      if (addProductData.success) {
        alert("Produit ajouté avec succès.");
      } else {
        alert("Erreur lors de l'ajout du produit: " + addProductData.message);
      }
    } else {
      alert("Erreur lors du téléchargement des images: " + uploadData.message);
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert(
      "Une erreur s'est produite, veuillez vérifier votre connexion et réessayer."
    );
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
      <p>Image Description</p>
      <div className="addproduct-imgdesc">
        {/* Image Description 1 */}
        <label htmlFor="imgdesc1-input">
          <img
            src={imgdesc1 ? URL.createObjectURL(imgdesc1) : upload_area}
            alt="Image Description 1"
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="imgdesc1"
          id="imgdesc1-input"
          hidden
        />
        {/* Image Description 2 */}
        <label htmlFor="imgdesc2-input">
          <img
            src={imgdesc2 ? URL.createObjectURL(imgdesc2) : upload_area}
            alt="Image Description 2"
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="imgdesc2"
          id="imgdesc2-input"
          hidden
        />
        {/* Image Description 3 */}
        <label htmlFor="imgdesc3-input">
          <img
            src={imgdesc3 ? URL.createObjectURL(imgdesc3) : upload_area}
            alt="Image Description 3"
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="imgdesc3"
          id="imgdesc3-input"
          hidden
        />
        {/* Image Description 4 */}
        <label htmlFor="imgdesc4-input">
          <img
            src={imgdesc4 ? URL.createObjectURL(imgdesc4) : upload_area}
            alt="Image Description 4"
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="imgdesc4"
          id="imgdesc4-input"
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
