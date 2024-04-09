import { Route, Routes } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Admin.css";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import ListUsers from "../../Components/ListUsers/ListUsers";
import Home from "../Home/Home";
import AddUser from "../../Components/AddUser/AddUser";
import ListDelivery from "../../Components/ListDelivery/ListDelivery";
import AddDelivery from "../../Components/AddDelivery/AddDelivery";
import ListOrder from "../../Components/ListOrder/ListOrder";
import UpdateUser from "../../Components/Update/UpdateUser/UpdateUser";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/updateuser" element= {<UpdateUser/>}/>
        <Route path="/allusers" element={<ListUsers />} />
        <Route path="/adddelivery" element={<AddDelivery />} />
        <Route path="/listdelivery" element={<ListDelivery />} />
        <Route path="/listorder" element={<ListOrder />} />
      </Routes>
    </div>
  );
};

export default Admin;
