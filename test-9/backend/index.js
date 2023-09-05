import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors";
import morgan from "morgan";
// import { Login, Register, getCurrentUser, getNumber, sendOtp, verifyOtp } from "../../test-9/backend/controller/User.controller.js";
import { checkAdmin, checkSeller, checkUser } from "../../test-9/backend/middleware/All.middleware.js";
import { addComment, addProduct, allProduct, deleteYourProduct, getMyProducts, rateProduct, updateYourProducts } from "../../test-9/backend/controller/Product.controller.js";
// import { addCart, addWishlist, deleteProduct, getCartProducts, getWishlistProducts } from "../../test-9/backend/controller/buyer.controller.js";
import { blockUser, findAllProducts, findAllSellers, findAllVerifyProduct, findAllbuyers, unBlockUser, verifyProduct } from "../../test-9/backend/controller/Admin.controllers.js"
// import jwt from "jsonwebtoken";
import routerIndex from "./Routers/index.js"

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))

app.use("/api/v1", routerIndex)

app.get("/", (req, res) => {
    return res.send("working....")
})

// function checkJwt(req, res, next) {
//     const fullToken = req.headers.authorization
//     if (fullToken) {
//         const token = fullToken.split(" ")[1];
//         if (token) {
//             try {
//                 // console.log(token, "token at middleware")
//                 const decodedData = jwt.verify(token, process.env.err_Auth);
// if(Math.floor(new Date().getTime()/1000) > decodedData.exp , "decodedData" ){
//     return res.status(404).json({ success: false, message: "Session is over, Please login again." })
// }
//                 // const expTime = decoededData?.exp;
//                 // const currentTimestamp = Math.floor(Date.now() / 1000);
//                 // console.log(expTime, currentTimestamp, "expTime at middleware")
//                 // if (new Date().getTime() > ) {
//                 //     return res.status(404).json({ success: false, message: "Session is over, Please login again." })
//                 // }
//                 next();
//             } catch (error) {
//                 console.log(error, "after error at exp")
//                 return res.status(500).json({ success: false, message: "Token is expired." })

//             }
//         }
//         next();
//     }
//     next();
// }

//general 
// app.post("/register", Register);
// app.post("/login", Login);
// app.post("/get-current-user", getCurrentUser);
// app.get("/all-products",allProduct);
// app.patch("/rate-product", checkUser, rateProduct);
// app.patch("/comment-product", checkUser, addComment)

///Twilio 
// app.post("/get-number", getNumber)
// app.post("/send-otp", sendOtp)
// app.post("/verify-otp", verifyOtp)

//wishlist
// app.post("/add-wishlist", addWishlist)
// app.get("/get-wishlist-products", getWishlistProducts)

//buyer
// app.post("/add-cart", addCart)
// app.get("/get-cart-products", getCartProducts)
// app.delete("/delete-product", deleteProduct)



//admin
app.patch("/block-user", checkAdmin, blockUser);
app.patch("/un-block-user", checkAdmin, unBlockUser);
app.patch("/verify-product", checkAdmin, verifyProduct);
app.get("/find-all-buyers", checkAdmin, findAllbuyers);
app.get("/find-all-sellers", checkAdmin, findAllSellers);
app.get("/find-all-products", checkAdmin, findAllProducts);
app.get("/find-all-verify-product", checkAdmin, findAllVerifyProduct);
// app.get("find-all-un-verify-product",checkAdmin,findAllUnverifyProduct)




//seller
// app.post("/add-product", checkSeller, addProduct);
// app.post("/get-your-products", checkSeller, getMyProducts)
// app.patch("/update-your-product", checkSeller, updateYourProducts)
// app.delete("/delete-your-product", checkSeller, deleteYourProduct)


mongoose.connect(process.env.mongo_URL).then(() => {
    console.log("connected to mongoDB....")
})

app.listen(5000, () => {
    console.log("port listening on 5000")
})