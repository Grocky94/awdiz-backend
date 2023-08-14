import bcrypt from "bcrypt"
import userModel from "../modal/user-model.js"
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.json({ status: "error", message: " all fields are manditory" })

        const isEmailExist = await userModel.find({ email: email })
        if (isEmailExist.length) {
            return res.json({ status: "error", message: "Email already exist, try different email." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });

        await user.save();

        return res.json({ status: "Success", message: "user Register successful..." })

    } catch (error) {
        res.json({ status: "error", message: error })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ status: "error", message: "all fields are manditory" });

        const user = await userModel.findOne({ email: email })
        if (!user) return res.json({ status: "error", message: "user not found.." });

        const isPasswordRight = await bcrypt.compare(password, user.password)
        if (isPasswordRight) {
            const userObject = {
                name: user.name,
                email: user.email,
                userId: user._id,
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
            return res.json({ status: "Success", message: "login successfull", user: userObject, token: token })
        }
        return res.json({ status: "error", message: "password is wrong" })

    }
    catch (error) {
        res.json({ status: "error", message: error })
    }
}