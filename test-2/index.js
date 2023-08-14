import dotenv from "dotenv";
import express from "express"
import mongoose from "mongoose";
import User from "./user.modal.js"
const app = express();
dotenv.config();
app.use(express.json());


// CRUD - CREATE   READ   UPDATE      DELETE
// METHODS  POST   GET    PATCH/PUT   DELETE

app.get("/", function (req, res) {
    res.send("working...");
})

app.post("/login", function (req, res) {
    res.send("login from login function");
})

app.post("/register", async function (req, res) {
    const { name, surname, email, age, password, confirmpassword } = req.body;
    if (!name) return res.send("Name is missing");
    if (!surname) return res.send("Surname is missing");
    if (!email) return res.send("Email is required");
    if (!age) return res.send("Age is missing");
    if (!password) return res.send("Password is required");
    if (!confirmpassword) return res.send("Confirm password is required")
    if (password != confirmpassword) return res.send("password and confirm password not matched")

    const user = new User({
        name: name,
        surname: surname,
        age: parseInt(age),
        email,
        password
    })

    await user.save();

    res.send("Registration done");

});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongoDB");
})
app.listen(8000, () => {
    console.log("listening on port 8000")
})