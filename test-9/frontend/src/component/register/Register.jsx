// import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  {toast}  from 'react-hot-toast';
import "./Register.css"
import api from '../ApiConfig';
const Register = () => {

    const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer" ,number:""})

    const router = useNavigate()

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleChangeForSelect = (event) => {
        setUserData({ ...userData, "role": event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.name && userData.email && userData.password && userData.confirmPassword && userData.role , userData.number) {
            if (userData.password === userData.confirmPassword) {
                const response = await api.post("/all/register", { userData });
                if (response.data.success) {
                    setUserData({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer" , number:""})
                    router('/login')
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }

            } else {
                toast.error("Password and Confirm Password not Matched.")
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }
    // console.log(userData, "userData")

    return (
        <div id="register-main-div">
            <h1 id="register-header">Register</h1>
            <form onSubmit={handleSubmit} id="register-form">
                <label>Name</label><br />
                <input type='text' onChange={handleChange} name='name' value={userData.name} className='register-input '/><br />
                <label>Email</label><br />
                <input type='email' onChange={handleChange} name='email' value={userData.email} className='register-input '/><br />
                <label>Role</label><br />
                <select onChange={handleChangeForSelect} className='register-select'>
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select><br />
                <label>Number</label><br />
                <input type='number' onChange={handleChange} name='number' value={userData.number} className='register-input '/><br />
                <label>Password</label><br />
                <input type='password' onChange={handleChange} name='password' value={userData.password} className='register-input '/><br />
                <label>Confirm Password</label><br />
                <input type='password' onChange={handleChange} name='confirmPassword' value={userData.confirmPassword} className='register-input '/><br />
                <input type='submit' value='Register' className='register-input-btn '/><br />
            </form>
            <button onClick={()=> router('/login')} className='register-btn '>Login</button>
        </div>
    )
}

export default Register