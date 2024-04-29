const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

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

// création d'un point de terminaison de téléchargement pour les images

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// schéma de création des produits

const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
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
    name: req.body.name,
  });
  console.log("Produit avec le nom : ", product.name, ", enregistré.");
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

// schéma des utilisateurs

const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

// Création d’un point de terminaison pour l’enregistrement des utilisateurs

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
    name: req.body.name,
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

// Création d’un point de terminaison pour l’enregistrement des nouvelles utilisateurs

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
    name: req.body.name,
  });
});

// modifier un utilisateur d'après l'email par l'administrateur

app.post("/updateuser", async (req, res) => {
  let { email, name, phone, password } = req.body;
  let user = await Users.findOne({ email: email });
  if (user) {
    user.name = name;
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
    user.name,
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

// création d'un schema pour les commandes

const Order = mongoose.model("Order", {
  id: { type: Number, required: true },
  nameuser: { type: String, required: true },
  nameproduct: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalprice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// ajout d'une commande
app.post("/addorder", async (req, res) => {
  const order = new Order({
    id: req.body.id,
    nameuser: req.body.user,
    nameproduct: req.body.product,
    quantity: req.body.quantity,
    totalprice: req.body.totalprice,
  });
  await order.save();
  console.log("Commande Ajoutée");
  res.send("Added");
});

// liste de toutes les commandes
app.get("/allorders", async (req, res) => {
  let orders = await Order.find({});
  console.log("Toutes Les Commandes Récupérées");
  res.send(orders);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Serveur fonctionnant sur le port :" + port);
  } else {
    console.log("Error : " + error);
  }
});
