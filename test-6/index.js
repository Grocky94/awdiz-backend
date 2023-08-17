import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Login, Register, getCurrentUser } from "./../test-6/controller/user.controller.js";
import { addProduct, allProduct, getMyProducts ,updateYourProducts } from "./../test-6/controller/Product.controller.js";
import { checkSeller } from "./../test-6/middleware/Seller.middleware.js";

const app = express();
app.use(express.json());
dotenv.config()

app.get("/", (req, res) => {
    return res.send("working...")
})
app.post("/register", Register);

app.post("/login", Login);

app.post("/get-current-user", getCurrentUser);

app.post("/add-product",checkSeller, addProduct);

app.get("/all-products", allProduct)

app.get("/get-your-products", checkSeller, getMyProducts)

app.patch("/update-your-product",checkSeller, updateYourProducts )

mongoose.connect(process.env.Mongo_URL).then(() => {
    console.log("connected to mongoDB...")
}).catch((error) => {
    return res.send({ status: "error", message: error.message })
})

app.listen(5000, () => {
    console.log("port listening on 5000")
})