import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Login, Register } from "./controller/User-controller.js";


const app = express();
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
    res.send("working...")
})

app.post("/register", Register)

app.post("/login", Login)

mongoose.connect(process.env.Mongo_URL).then(() => {
    console.log("conncted to DB...")
})

app.listen(9000, () => {
    console.log("listening on port 9000")
})