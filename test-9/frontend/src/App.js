// import './App.css';

import { Route, Routes } from "react-router-dom";
import Home from "../../frontend/src/component/Home";
import Register from "../../frontend/src/component/register/Register";
import Login from "../../frontend/src/component/login/Login";
import { useContext } from "react";
import { MyContext } from "./context/AuthContext";


function App() {
  const { state } = useContext(MyContext);
  console.log(state?.user, "-user")
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
