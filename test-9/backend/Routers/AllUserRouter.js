import express from "express"
import { Login, Register, getCurrentUser, getNumber, sendOtp, verifyOtp } from "../controller/User.controller.js"
import { addCart, addComment, allCartProducts, allProduct, getSingleProductData, rateProduct } from "../controller/Product.controller.js"
import { checkUser } from "../middleware/All.middleware.js"
import { addWishlist, getWishlistProducts } from "../controller/buyer.controller.js"

const router = express.Router()

router.post("/register", Register)
router.post("/get-current-user", getCurrentUser)
router.post("/login", Login)
router.get("/all-products", allProduct)
router.patch("/rate-product", checkUser, rateProduct)
router.patch("/comment-product", checkUser, addComment)
router.post("/get-single-product-data", getSingleProductData)
router.post("/add-cart",addCart)
router.post("/all-cart-products",allCartProducts)

//cart
router.post("/add-wishlist", addWishlist)
router.get("/get-wishlist-products", getWishlistProducts)

// for profile attemp 
router.post("/get-number", getNumber)
router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOtp)

export default router