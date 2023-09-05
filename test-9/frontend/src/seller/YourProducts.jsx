// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./YourProducts.css"
import api from '../component/ApiConfig';
const YourProducts = () => {
    const [allProducts, setAllProducts] = useState();
    useEffect(() => {
        try {
            async function getProducts() {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await api.post("/seller/get-your-products", { token })
                if (response?.data?.success) {
                    setAllProducts(response?.data?.products)
                }
            }
            getProducts();
        } catch (error) {
            console.log(error)
        }

    }, [])
    return (
        <div>
            <h1>Your Products</h1>
            <div>
                {allProducts?.length ? <div id="parent-div-your-product"> {allProducts.map((product) => (
                    <div key={product._id} id="showing-div-product">
                        <div id="showing-div-product-img-holder">
                            <img src={product.image} />
                        </div>
                        <p>Name : {product.name}</p>
                        <p>Price : {product.price}</p>
                    </div>
                ))}
                </div> : <div>No Products found.</div>}
            </div>
        </div>
    )
}

export default YourProducts