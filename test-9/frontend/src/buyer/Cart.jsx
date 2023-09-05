import React, { useContext, useEffect, useState } from 'react'
import api from '../component/ApiConfig';

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);

    // console.log(state, "state here")

    const [totalPrice, setTotalProductPrice] = useState(0)

    useEffect(() => {
        if (cartProducts?.length) {
            let finalPrice = 0
            for (let i = 0; i < cartProducts?.length; i++) {
                console.log(cartProducts[i])
                finalPrice += cartProducts[i]?.price
            }
            setTotalProductPrice(finalPrice)
        }
    }, [cartProducts])


    useEffect(() => {
        async function getCartProduct() {
            try {
                const token = JSON.parse(localStorage.getItem("token"))

                const response = await api.post('/all/all-cart-products', { token })
                // console.log(response.data, "get cart from front end")
                if (response.data.success) {
                    setCartProducts(response.data.product)
                }
            } catch (error) {
                console.log(error, "error in cart")
            }
        }
        getCartProduct()

    }, [])

    // const checkOut = () =>{
    //    if(cartProducts){
    //     try {
    //         const userCart 
    //     } catch (error) {

    //     }
    //    } 
    // }


    console.log(cartProducts, "cartProducts here")
    return (
        <div style={{ height: "100vh", width: "100%", display: "flex" }}>
            <div style={{ border: "1px solid black", height: "100vh", flexWrap: "nowrap", width: "60%", display: "flex" }}>
                {cartProducts?.length && cartProducts.map((item) => (<div key={item._id} style={{ height: "50vh", width: "20%", border: "1px solid black", margin: "2%" }}>
                    <div style={{ height: "40vh", width: "100%" }}><img style={{ height: "100%", width: "100%" }} src={item.image} /></div>
                    <p>Name: {item.name}</p>
                    <p>Price: {item.price} /-</p>
                    <p>Category: {item.category}</p>
                </div>))}
            </div>
            <div style={{ height: "25vh", width: "30%", marginLeft: "5%", border: "1px solid black", marginTop: "10%" }}>
                <h1 style={{ textAlign: "center" }}>Total Price : {totalPrice}</h1>
                <button onClick={() => checkOut()}>Checkout</button>
            </div>
        </div>

    )
}

export default Cart
