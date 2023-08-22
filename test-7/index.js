import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Login, Register, getCurrentUser } from "../test-7/controller/User.controller.js";
import { checkSeller } from "../test-7/middleware/Seller.middleware.js";
import { addProduct, allProduct, deleteYourProduct, getMyProducts, updateYourProducts } from "../test-7/controller/Product.controller.js";
import { addCart, addWishlist, deleteProduct, getCartProducts, getWishlistProducts } from "../test-7/controller/buyer.controller.js";

const app = express();
dotenv.config()
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("working....")
})

app.post("/register", Register);
app.post("/login", Login);
app.post("/get-current-user", getCurrentUser);
app.get("/all-products", allProduct)

//wishlist
app.post("/add-wishlist", addWishlist)
app.get("/get-wishlist-products", getWishlistProducts)

//buyer
app.post("/add-cart", addCart)
app.get("/get-cart-products", getCartProducts)


app.delete("/delete-product", deleteProduct)


//seller
app.post("/add-product", checkSeller, addProduct);
app.get("/get-your-products", checkSeller, getMyProducts)
app.patch("/update-your-product", checkSeller, updateYourProducts)
app.delete("/delete-your-product", checkSeller, deleteYourProduct)


mongoose.connect(process.env.mongo_URL).then(() => {
    console.log("connected to mongoDB....")
})

app.listen(5000, () => {
    console.log("port listening on 5000")
})