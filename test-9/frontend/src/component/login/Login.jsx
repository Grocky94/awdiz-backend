import React, { useContext, useEffect, useState } from 'react'
// import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import "./Login.css"
import { MyContext } from '../../context/AuthContext';
import api from '../ApiConfig';

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" })
    const { state, dispatch } = useContext(MyContext);
    const router = useNavigate();


    const handlechange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (userData.email && userData.password) {
            const response = await api.post("/all/login", { userData })

            if (response.data.success) {
                dispatch({
                    type: "Login",
                    payload: response.data.user
                })
                localStorage.setItem("token", JSON.stringify(response.data.token))
                setUserData({ email: "", password: "" })
                router("/");
              toast.success(response.data.message);
            } else {
              toast.error(response.data.message)
            }

        } else {
         toast.error("All fields are mandatory")
        }
    }

    useEffect(() => {
        if (state?.user?.name) {
            router("/")
        }
    }, [state])

    return (
        <div id="login-main-div">
            <h1 id="login-header">Login</h1>
            <form onSubmit={handleSubmit} id="login-form">
                <label>Email:</label><br />
                <input type='email' name='email' value={userData.email} onChange={handlechange} className='login-input ' /><br />
                <label>password:</label><br />
                <input type="password" name='password' value={userData.password} onChange={handlechange} className='login-input ' /><br />
                <input type="submit" value="Login" className='login-input-btn' />
            </form>
            <button className='login-btn' onClick={() => router("/register")}>Register</button>
        </div>
    )

}

export default Login
