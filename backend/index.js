const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// connecter a mongoDB
mongoose.connect(
  "mongodb+srv://hajjiriadh378:hajji11riadh11!!@clusterbee0.sist3wu.mongodb.net/bee"
);
// creer API
app.get("/", (req, res) => {
  res.send("Express is running");
});
// moteur de stockage d'images
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });
// Création d'un point de terminaison de téléchargement pour les images
app.use("/images", express.static("upload/images"));
app.post(
  "/upload",
  upload.fields([
    { name: "image" },
    { name: "imgdesc1" },
    { name: "imgdesc2" },
    { name: "imgdesc3" },
    { name: "imgdesc4" },
  ]),
  (req, res) => {
    // Créez un objet pour stocker les URLs des images
    const imageUrls = {
      image: req.files["image"]
        ? `http://localhost:${port}/images/${req.files["image"][0].filename}`
        : null,
      imgdesc1: req.files["imgdesc1"]
        ? `http://localhost:${port}/images/${req.files["imgdesc1"][0].filename}`
        : null,
      imgdesc2: req.files["imgdesc2"]
        ? `http://localhost:${port}/images/${req.files["imgdesc2"][0].filename}`
        : null,
      imgdesc3: req.files["imgdesc3"]
        ? `http://localhost:${port}/images/${req.files["imgdesc3"][0].filename}`
        : null,
      imgdesc4: req.files["imgdesc4"]
        ? `http://localhost:${port}/images/${req.files["imgdesc4"][0].filename}`
        : null,
    };

    // Répondez avec succès et les URLs des images
    res.json({
      success: 1,
      images: imageUrls,
    });
  }
);
// schéma de création des produits
const Product = mongoose.model("Product", {
  id: { type: Number },
  name: { type: String, required: true },
  image: { type: String, required: true },
  imgdesc1: { type: String },
  imgdesc2: { type: String },
  imgdesc3: { type: String },
  imgdesc4: { type: String },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number },
  description: { type: String },
  date: { type: Date, default: Date.now },
  avilable: { type: Boolean, default: true },
});
//ajouter un produit à la base de données
app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});

    let id;

    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      imgdesc1: req.body.imgdesc1,
      imgdesc2: req.body.imgdesc2,
      imgdesc3: req.body.imgdesc3,
      imgdesc4: req.body.imgdesc4,
      category: req.body.category,
      quantity: req.body.quantity,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      description: req.body.description,
    });
    console.log(product);
    await product.save();
    res.json({
      success: true,
      message: `Produit avec le nom : ${product.name}, enregistré.`,
    });
    console.log("Produit avec le nom : ", product.name, " enregistré");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Une erreur s'est produite lors de l'enregistrement du produit.",
      error: error.message,
    });
  }
});
//modifier un produit à la base de données
app.post("/updateproduct", async (req, res) => {
  await Product.findOneAndUpdate(
    { id: req.body.id },
    {
      name: req.body.name,
      image: req.body.image,
      imgdesc1: req.body.imgdesc1,
      imgdesc2: req.body.imgdesc2,
      imgdesc3: req.body.imgdesc3,
      imgdesc4: req.body.imgdesc4,
      category: req.body.category,
      quantity: req.body.quantity,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      description: req.body.description,
    }
  );
  console.log("Produit avec id ", req.body.id, " modifié");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// créer une API pour supprimer des produits
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Produit avec id ", req.body.id, " supprimé");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// créer une API pour obtenir tous les produits
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("Tous Les Produits Récupérés");
  res.send(products);
});
// shéma des admins
const Admin = mongoose.model("Admin", {
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  date: { type: Date, default: Date.now },
});
// création d'un api des nouveaux admins
app.post("/signupadmin", async (req, res) => {
  let check = await Admin.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "existant !" });
  }
  // Vérifier si le token fourni est correct
  if (req.body.token !== "beeAdmin") {
    return res
      .status(400)
      .json({ success: false, errors: "Code de sécurité invalide !" });
  }
  const admin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await admin.save();
  console.log(admin);

  const data = { admin: { id: admin.id } };
  const token = jwt.sign(data, "beeAdmin");
  res.json({ success: true, token });
});
//creation d'un api des admins
app.post("/loginadmin", async (req, res) => {
  let admin = await Admin.findOne({ email: req.body.email });
  if (admin) {
    const passCompare = req.body.password === admin.password;
    if (passCompare) {
      const data = {
        admin: { id: admin.id },
      };
      const token = jwt.sign(data, "beeAdmin");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Mot de passe incorrect !" });
    }
  } else {
    res.json({ success: false, errors: "Email incorrect !" });
  }
});
// schéma des utilisateurs
const Users = mongoose.model("user", {
  username: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});
// Création d’un point de terminaison pour l’enregistrement des nouveaux utilisateurs
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "existant !" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});
// Création d’un point de terminaison pour l’enregistrement des utilisateurs
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: { id: user.id },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Mot de passe incorrect !" });
    }
  } else {
    res.json({ success: false, errors: "IDENTIFIANT DE Messagerie INCORRECT" });
  }
});
//supprimer un utilisateur par l'administrateur
app.post("/removeuser", async (req, res) => {
  await Users.findOneAndDelete({ email: req.body.email });
  console.log("Utilisateur supprimé avec email : ", req.body.email);
  res.json({
    success: true,
    name: req.body.username,
  });
});
// modifier un utilisateur d'après l'email par l'administrateur
app.post("/updateuser", async (req, res) => {
  let { email, username, phone, password } = req.body;
  let user = await Users.findOne({ email: email });
  if (user) {
    user.username = username;
    user.phone = phone;
    user.password = password;
    await user.save();
    console.log("Mise à jour de l'utilisateur par e-mail : ", email);
  } else {
    console.log("Utilisateur avec e-mail : ", email, " non trouvé.");
  }
  res.send(user);
});
//liste des utilisateurs
app.get("/allusers", async (req, res) => {
  let users = await Users.find({});
  console.log("Tous Les Utilisateurs Récupérés");
  res.send(users);
});
// schema des livreurs
const Delivery = mongoose.model("Delivery", {
  name: { type: String, required: true },
  email: { type: String, unique: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
//ajouter des livreurs par l'administrateur
app.post("/adddelivery", async (req, res) => {
  let deliverys = await Delivery.find({});

  let id;

  if (deliverys.length > 0) {
    let last_delivery_array = deliverys.slice(-1);
    let last_delivery = last_delivery_array[0];
    id = last_delivery.id + 1;
  } else {
    id = 1;
  }

  const delivery = new Delivery({
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    phone: req.body.phone,
    description: req.body.description,
  });
  console.log(delivery);
  await delivery.save();
  res.json({
    success: true,
    name: req.body.name,
  });
  console.log("livreur avec le nom : ", delivery.name, " enregistré.");
});
// modifier un livreur d'après l'email par l'administrateur
app.post("/updatedelivery", async (req, res) => {
  let { email, name, city, phone, description } = req.body;
  let delivery = await Delivery.findOne({ email: email });
  if (delivery) {
    delivery.name = name;
    delivery.city = city;
    delivery.phone = phone;
    delivery.description = description;
    await delivery.save();
    console.log("Mise à jour de la livreur par e-mail : ", email);
  } else {
    console.log("Livreur avec email : ", email, " n'existe pas");
  }
  res.send(delivery);
});
// supprimer un livreur par l'administrateur
app.post("/removedelivery", async (req, res) => {
  await Delivery.findOneAndDelete({ id: req.body.id });
  console.log("Livreur avec id ", req.body.id, " supprimée");
  res.json({
    success: true,
    name: req.body.name,
  });
});
//tous les livreurs
app.get("/alldelivery", async (req, res) => {
  let deliverys = await Delivery.find({});
  console.log("Toutes les livreurs Récupérées");
  res.send(deliverys);
});
// schema des ordres
const Orders = mongoose.model("Order", {
  fname: { type: String, required: true },
  lname: { type: String },
  address: { type: String },
  city: { type: String, required: true },
  Postcode: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  remarques: { type: String },
  productinfo: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  total: { type: Number },
  date: { type: Date, default: Date.now },
  delivred: { type: Boolean, default: false },
});
// ajouter un ordre par l'utilisateur
app.post("/addorder", async (req, res) => {
  // Validation des champs requis
  const requiredFields = ["fname", "city", "phone", "product", "total"];
  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        success: false,
        message: `Le champ ${field} est requis`,
      });
    }
  }
  // Vérifiez si le tableau de produits n'est pas vide
  if (req.body.product.length === 0) {
    return res.status(400).json({
      success: false,
      message: "La liste des produits ne peut pas être vide",
    });
  }
  // Création de la commande avec les champs fournis
  const orderData = {
    fname: req.body.fname,
    lname: req.body.lname || "",
    address: req.body.address || "",
    city: req.body.city,
    Postcode: req.body.Postcode || "",
    phone: req.body.phone,
    email: req.body.email || "",
    remarques: req.body.remarques || "",
    productinfo: req.body.product,
    total: req.body.total,
  };
  console.log(orderData);
  const order = new Orders(orderData);
  try {
    const savedOrder = await order.save();
    console.log("Commande enregistrée avec succès");
    res.json({
      success: true,
      message: "Commande enregistrée avec succès",
      orderDetails: savedOrder,
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la commande:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'enregistrement de la commande",
      error: error.message,
    });
  }
});
// modifier un ordre par l'utilisateur
app.post("/updateorder", async (req, res) => {
  const { id, delivred } = req.body;

  try {
    const order = await Orders.findOne({ id: id });

    if (!order) {
      console.log("Commande avec id : ", id, " n'existe pas");
      return res.status(404).send({ error: "Commande non trouvée" });
    }

    // Mettre à jour uniquement le champ delivred
    order.delivred = delivred;

    await order.save();
    console.log(
      "Mise à jour de la commande ID :",
      id,
      " état livrée :",
      delivred
    );
    return res.send(order);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la commande:", error);
    return res
      .status(500)
      .send({ error: "Erreur lors de la mise à jour de la commande" });
  }
});
//supprimer un commande
app.post("/removeorder", async (req, res) => {
  await Orders.findOneAndDelete({ id: req.body.id });
  console.log("Commande avec id ", req.body.id, " supprimée");
  res.json({
    success: true,
    name: req.body.name,
  });
});
//tous les ordres
app.get("/allorders", async (req, res) => {
  let orders = await Orders.find({});
  console.log("Toutes les commandes Récupérées");
  res.send(orders);
});
// Création d’un point de terminaison pour l’enregistrement des 'newcollection'
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("Nouvelle Collection Récupérée");
  res.send(newcollection);
});
// Création d’un point de terminaison pour l’enregistrement des 'popular choise'
app.get("/popularinmakeup", async (req, res) => {
  let products = await Product.find({ category: "makeup" });
  let popular_in_makeup = products.slice(0, 4);
  console.log("Populaire dans le maquillage récupéré");
  res.send(popular_in_makeup);
});
// Related products
app.get("/relatedproducts", async (req, res) => {
  let products = await Product.find({ category: "visage" });
  let popular_products = products.slice(0, 4);
  console.log("Populaire dans les produits récupérés");
  res.send(popular_products);
});
// Création d’un logiciel de gestion pour récupérer l’utilisateur (fonction middleware)
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({
      errors: "Veuillez vous authentifier en utilisant un jeton valide",
    });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({
        errors: "Veuillez vous authentifier en utilisant un jeton valide",
      });
    }
  }
};
// Création d’un point de terminaison pour ajoutée les produits dans le cart
app.post("/addtocart", fetchUser, async (req, res) => {
  let user = await Users.findOne({ _id: req.user.id });
  console.log(
    user.username,
    " Ajout du produit avec id :",
    req.body.itemId,
    " dans se panier"
  );
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});
// Création d’un point de terminaison pour supprimer les produits dans le cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  let user = await Users.findOne({ _id: req.user.id });
  console.log(
    user.name,
    " Supprimé le produit avec id : ",
    req.body.itemId,
    " de son panier"
  );
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});
// Création d’un point de terminaison pour obtenir le panier (cart)
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});
//vider le panier
app.post("/emptycart", fetchUser, async (req, res) => {
  console.log("EmptyCart");
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData = {};
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Empty");
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Serveur fonctionnant sur le port :" + port);
  } else {
    console.log("Error : " + error);
  }
});
