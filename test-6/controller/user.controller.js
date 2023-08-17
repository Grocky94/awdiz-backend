import UserModel from "./../../test-6/model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) return res.json({ status: "error", message: "All fields are mandatory" })

        const isEmailExist = await UserModel.find({ email: email })
        if (isEmailExist.length) {
            return res.json({ status: "error", message: "Email already exist, try using different email" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({ name, email, password: hashedPassword, role })

        await user.save()

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ status: "error", message: "All fields are mandatory" })

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ status: "error", message: "user not found" })
        }

        const isPasswordRight = await bcrypt.compare(password, user.password);

        if (isPasswordRight) {
            const userObject = {
                name: user.name,
                email: user.email,
                userId: user._id,
                role: user.role
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_ENCRYPT)
            return res.status(200).json({ status: "success", message: "login successfull", user: userObject, token: token })
        }
        return res.status(404).json({ status: "error", massage: "incorrect password" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ status: "error", message: "Token is mandatory" })

        const decodedData = jwt.verify(token, process.env.JWT_ENCRYPT);
        // console.log(decodedData, "decodedData")

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "invalid json web token" })
        }
        const userId = decodedData?.userId

        const user = await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({ status: "error", message: " user not found" })
        }

        const userObject = {
            name: user.name,
            email:user.email,
            _id: user._id,
            role: user.role
        }
        return res.status(200).json({ status: "success", user: userObject })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}