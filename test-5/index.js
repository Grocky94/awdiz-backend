import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Register, Login, getCurrentUser } from "./../test-5/controller/user-controller.js";
import { addProduct } from "./../test-5/controller/Product-controller.js"
import { checkSeller } from "./../test-5/middlewares/Seller.middleware.js"

const app = express();
app.use(express.json());
dotenv.config();


app.get("/", (req, res) => {
    return res.send("working....")
})

app.post("/register", Register);

app.post("/login", Login)

app.post("/get-current-user", getCurrentUser)

app.post("/add-product", checkSeller, addProduct)

mongoose.connect(process.env.Mongo_URL).then(() => {
    console.log("connected to bd....");
})

app.listen(7000, () => console.log(
    "listening on port 7000"
))