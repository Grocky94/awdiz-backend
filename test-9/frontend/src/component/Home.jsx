import React, { useState, useEffect} from 'react'
import axios from "axios"

const Home = () => {
    const [allItem, setAllItem] = useState();

    useEffect(() => {
        async function getProducts() {
            const response = await axios.get("http://localhost:5000/all-products")
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
                {allItem?.length ? <div id="parent-div-your-product"> {allItem.map((pro) => (
                    <div key={pro._id} id="showing-div-product">
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
