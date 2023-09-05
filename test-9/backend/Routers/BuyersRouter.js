import express from "express"
import { addCart, deleteProduct, getCartProducts } from "../controller/buyer.controller.js"

const router = express.Router()

router.post("/add-cart",addCart)
router.get("/get-cart-products",getCartProducts)
router.delete("/delete-product", deleteProduct)

export default router