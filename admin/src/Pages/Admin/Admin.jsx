import { Route, Routes } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Admin.css";

// importation des composants
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import ListUsers from "../../Components/ListUsers/ListUsers";
import Home from "../Home/Home";
import AddUser from "../../Components/AddUser/AddUser";
import ListDelivery from "../../Components/ListDelivery/ListDelivery";
import AddDelivery from "../../Components/AddDelivery/AddDelivery";
import UpdateUser from "../../Components/Update/UpdateUser/UpdateUser";
import UpdateDelivery from "../../Components/Update/UpdateDelivery/UpdateDelivery";
import ListReservation from "../../Components/ListReservation/ListReservation";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/updateuser" element={<UpdateUser />} />
        <Route path="/allusers" element={<ListUsers />} />
        <Route path="/adddelivery" element={<AddDelivery />} />
        <Route path="/updatedelivery" element={<UpdateDelivery />} />
        <Route path="/listdelivery" element={<ListDelivery />} />
        <Route path="/listreservation" element={<ListReservation />} />
      </Routes>
    </div>
  );
};

export default Admin;
