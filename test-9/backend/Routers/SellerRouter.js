import express from "express"
import { addProduct, deleteYourProduct, getMyProducts, updateYourProducts } from "../controller/Product.controller.js"
import { checkSeller } from "../middleware/All.middleware.js"

const router = express.Router()

router.post("/add-product", checkSeller, addProduct)
router.post("/get-your-products",checkSeller,getMyProducts)
router.patch("/update-your-product",checkSeller,updateYourProducts)
router.delete("/delete-your-product",checkSeller,deleteYourProduct)

export default router