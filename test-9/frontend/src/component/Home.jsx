import React, { useState, useEffect} from 'react'
// import axios from "axios"
import api from './ApiConfig';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [allItem, setAllItem] = useState();
const router = useNavigate()
    useEffect(() => {
        async function getProducts() {
            const response = await api.get("/all/all-products")
            // console.log(response,"response from backend")
            if (response?.data?.success) {
                setAllItem(response?.data?.products)
            }
        }
        getProducts();
    }, [])
    // console.log(state)
    return (
        <div>
            <h1 style={{ alignItems: "center" }}>Shoping</h1>
            <div>
                {allItem?.length ? <div id="parent-div-your-product" > {allItem.map((pro) => (
                    <div key={pro._id} id="showing-div-product" onClick={()=>router(`/single-products/${pro._id}`)}>
                        <div id="showing-div-product-img-holder">
                            <img src={pro.image} />
                        </div>
                        <p>Name : {pro.name}</p>
                        <p>Price : {pro.price}</p>
                    
                    </div>
                ))}
                </div> : <div>No Products found.</div>}
            </div>
        </div>
    )
}

export default Home
