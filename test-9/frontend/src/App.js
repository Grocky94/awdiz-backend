// import './App.css';

import { Route, Routes } from "react-router-dom";
import Home from "../../frontend/src/component/Home";
import Register from "../../frontend/src/component/register/Register";
import Login from "../../frontend/src/component/login/Login";
import Navbar from "./common/Navbar";
import Addproduct from "./seller/Addproduct";
import YourProducts from "./seller/YourProducts";
import Profile from "./component/profile/Profile";
import SingleProduct from "./buyer/SingleProduct";
import Cart from "./buyer/Cart.jsx"

// import { useContext } from "react";
// import { MyContext } from "./context/AuthContext";


function App() {
  // const { state } = useContext(MyContext);
  // console.log(state?.user, "-user")
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/add-product' element={<Addproduct />} />
        <Route exact path='/your-products' element={<YourProducts />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/single-products/:id" element={<SingleProduct />} />
        <Route exact path="/cart" element={<Cart /> } />
      </Routes>
    </div>
  );
}

export default App;
