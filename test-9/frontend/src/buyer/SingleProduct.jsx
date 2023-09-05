import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../component/ApiConfig';
import { MyContext } from "../context/AuthContext"
import { toast } from "react-hot-toast"

const SingleProduct = () => {
    const [singleProduct, setSingleProduct] = useState({})
    const { id } = useParams();
    const { state } = useContext(MyContext)
    // console.log(state, "state from singleProduct")
    useEffect(() => {
        if (id) {
            const getSingleProductData = async () => {
                try {
                    const response = await api.post("/all/get-single-product-data", { productId: id })
                    if (response.data.success) {
                        setSingleProduct(response.data.product)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            getSingleProductData()
        }
    }, [id])

    const addToCart = async () => {
        try {
            const response = await api.post("/all/add-cart", { productId: id, userId: state?.user?.userId })
            if (response.data.success)
                toast.success("product has successfully added !!")
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div style={{ border: "1px solid black", height: "100vh", width: "100%", display: "flex" }}>
            {singleProduct?.name ? <><div style={{ border: "1px solid #eaefed", height: "100vh", width: "60%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ border: "1px solid #eaefed", height: "60vh", width: "50%", margin: "2%" }}><img style={{ height: "100%", width: "100%" }} src={singleProduct.image} /></div >
            </div>

                <div style={{ border: "1px solid #eaefed", height: "100vh", width: "40%" }}>
                    <div style={{ border: "5px solid #eaefed", width: "80%", marginLeft: "10%", marginTop: "20%" }}>
                        <h1 style={{ textAlign: "center" }}>{singleProduct.name}</h1>
                        <p style={{ margin: "5%" }}>Price: {singleProduct.price} /-</p>
                        <p style={{ margin: "5%" }}>Category: {singleProduct.category}</p>
                        <button style={{ height: "5vh", width: "80%", marginLeft: "10%", marginBottom: "2%", fontSize: "1.1em", backgroundColor: "#30d5c8", border: "none", color: "#eaefed" }} onClick={() => addToCart(singleProduct._id)}>Add to cart</button>
                    </div>
                </div>
            </> : <div>Loading...</div>}
        </div >
    )
}

export default SingleProduct
