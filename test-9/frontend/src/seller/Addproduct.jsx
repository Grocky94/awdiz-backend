import React, { useState } from 'react'
// import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import "./Addproduct.css"
import SellerProtected from '../common/SellerProcted';
import api from '../component/ApiConfig'
const Addproduct = () => {
  const [productData, setProductData] = useState({ name: "", price: "", image: "", category: "" })
  const router = useNavigate()
  const handleChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (productData.name && productData.price && productData.image && productData.category) {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await api.post("/seller/add-product", {token, productData})
        // console.log(response.data, "-addproduct from front end ");

        if (response.data.success) {
          setProductData({ name: "", price: "", image: "", category: "" })
          toast.success(response.data.success)
          // router('/seller/get-your-products')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error("All fields are manditory!!")
    }
  }


  return (
    <SellerProtected>
      <div id="add-product">
        <h1 id="add-product-header-one">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <label className='add-product-label'>Name</label><br />
          <input className="add-product-input" type='text' onChange={handleChange} name='name' value={productData.name} /><br />
          <label className='add-product-label'>Price</label><br />
          <input className="add-product-input" type='number' onChange={handleChange} name='price' value={productData.price} /><br />
          <label className='add-product-label'>Image</label><br />
          <input className="add-product-input" type='text' onChange={handleChange} name='image' value={productData.image} /><br />
          <label className='add-product-label'>Category</label><br />
          <input className="add-product-input" type='text' onChange={handleChange} name='category' value={productData.category} /><br />
          <input id="add-product-submit-input" type='submit' value='Add Product' /><br />
        </form>
        <button id="add-product-btn-toggle" onClick={() => router('/your-products')}>All Products</button>
      </div>
    </SellerProtected>
  )
}

export default Addproduct
