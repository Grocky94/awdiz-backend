import React, { useContext } from 'react'
import { MyContext } from '../context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Navbar = () => {
    const { state, dispatch } = useContext(MyContext)
    const router = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        dispatch({
            type: "Logout"
        })
        toast.success("logout successfull")
        router("/")
    }

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", border: "1px solid black", height: "8vh" }}>
            <div style={{ display: "flex", justifyContent: "space-around", width: "50%" }}>
                <h4 onClick={() => router("/")} style={{cursor:"pointer"}}>Logo</h4>
                {state?.user?.role != "Seller" ? <>
                    <h4>Mens</h4>
                    <h4>Womens</h4>
                    <h4>Kids</h4></> : null}
                {/* seller */}
                {state?.user?.role == "Seller" ? <h4 onClick={() => router('/add-product')}>Add Products</h4> : null}
                {state?.user?.role == "Seller" ? <h4 onClick={() => router('/your-products')}>Your Products</h4> : null}
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", width: "30%" }}>
                {state?.user ? <h3 onClick={()=>router("/cart")}> Cart </h3> : null}
                {state?.user && <h3 onClick={logout} style={{cursor:"pointer"}}>Logout</h3>}
                {state?.user ? <h3 onClick={()=>router("/profile")}>{state?.user?.name}-{state?.user?.role}</h3> : <h3 onClick={() => router("/register")} style={{cursor:"pointer"}}>Login/Register</h3>}
            </div>
        </div >
    )
}

export default Navbar
