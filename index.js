import express from "express";
import { login, register } from "./controller/user.controller.js";
import mongoose from "mongoose";

const app = express();

app.get("/", function (req, res) {
    res.send("welcome to backend");
})

app.get("/login", login)

app.get("/register",register)

mongoose.connect("mongodb+srv://rocky:Emu041620@cluster0.bsipejl.mongodb.net/AWDIZ-BACKEND").then(()=>{
    console.log("connected to mongoDb")
}).catch((error)=>{
console.log("error while connecting to mongoDB ", error)
})

app.listen(8000, () => {
    console.log("server listening on port 8000")
})