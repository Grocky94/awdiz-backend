import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import User from "./model/user.model.js";
const app = express();

app.use(express.json())
dotenv.config();

app.get("/", function (req, res) {
    res.send("welcome to backend")
})

app.post("/register", async function (req, res) {
    const { name, surname, age, password, confirmpassword, email } = req.body
    if (!name) return res.send("Name is missing");
    if (!surname) return res.send("Surname is missing");
    if (!email) return res.send("Email is missing");
    if (!password) return res.send("Password is missing");
    if (!age) return res.send("Age is missing");
    if (!confirmpassword) return res.send("confirm Password is missing");
    if (password != confirmpassword) return res.send("password and confirm password mis match");

    const user = new User({
        name: name,
        surname: surname,
        age: parseInt(age),
        email,
        password
    })

    await user.save();

    res.send("registration done");

})

app.get("/find", async function (req, res) {
    const { email } = req.body
    if (!email) return res.send("email is required")


    const user = await User.find({ email: email }).select("-password")
    console.log(user, "user list here")
    if (user.length) {
        return res.send(user[0])
    }
    return res.send("user not found")

    // const user = await User.find({ email: email })
    // return [{}]
    // const user = await User.findById(swaraj)
    // return {}
    // const user = await User.findOne({name : "Swaraj"})
    // return {}
})

app.patch("/update/:id", async (req, res) => {
    const { age } = req.body;
    const { id } = req.params;

    if (!id) return res.send("age is missing");
    if (!age) return res.send("age is missing");
    // if (!number) return res.send("number is missing");

    const updateUser = await User.findByIdAndUpdate(id, { age }, { new: true }).select("-password")

    return res.json({ message: "Data updated", data: updateUser })
    // return res.send("conneted to patch")
})

app.delete("/delete", async (req, res) => {
    const { id } = req.query;
    if (!id) return res.send("Id is required...")

    const deleteUser = await User.findByIdAndDelete(id)
    return res.json({ message: "user deleted", data: deleteUser })
})



mongoose.connect(process.env.mongo_URL).then(() => {
    console.log("connected to mongoDB");
})

app.listen(8000, () => {
    console.log("listening at port 8000")
})