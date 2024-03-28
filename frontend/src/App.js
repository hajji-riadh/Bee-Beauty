import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import

import { Shop } from "./Pages/Shop";
import { ShopCategory } from "./Pages/ShopCategory";
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { Login } from "./Pages/Login";
import { Footer } from "./Components/Footer/Footer";
import visage_banner from "./Components/Assets/pnk.png";
import makeup_banner from "./Components/Assets/banner_makeup.jpg";
import douche_banner from "./Components/Assets/douche_banner.jpg";
import parfum_banner from "./Components/Assets/parfum_banner.jpg";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/visages"
            element={<ShopCategory banner={visage_banner} category="visage" />}
          />
          <Route
            path="/makeups"
            element={<ShopCategory banner={makeup_banner} category="makeup" />}
          />
          <Route
            path="/champoins"
            element={<ShopCategory banner={douche_banner} category="douche" />}
          />
          <Route
            path="/parfums"
            element={<ShopCategory banner={parfum_banner} category="parfum" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
