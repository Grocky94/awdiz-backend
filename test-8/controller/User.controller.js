 import UserModel from "../../test-8/model/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) throw new Error("all fields are manditory");

        const isEmailExist = await UserModel.find({ email: email })
        if (isEmailExist.length) {
            throw new Error("Email already exist, try using different email")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({ name, email, password: hashedPassword ,role})

        await user.save()

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const Login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) throw new Error({ success: "false", message: "All fields are mandatory" })


        const user = await UserModel.findOne({ email })
        if (!user) {
            throw new Error({ success: "false", message: "user not found" })
        }
        if (user.blocked) {
            return res.status(404).json({ success: false, message: "your are have been block by user, contact us!!" })
        }
        const isPasswordRight = await bcrypt.compare(password, user.password);

        if (isPasswordRight) {
            const userObject = {
                name: user.name,
                email: user.email,
                userId: user._id,
                role: user.role
            }
            const token = jwt.sign({ userId: user._id }, process.env.err_Auth)
            return res.status(200).json({ status: "success", message: "login successfull", user: userObject, token: token })
        }
        throw new Error("incorrect password")
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}
export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) throw new Error("Token is mandatory")

        const decodedData = jwt.verify(token, process.env.err_Auth);
        // console.log(decodedData, "decodedData")

        if (!decodedData) {
            throw new Error({ success: false, message: "invalid json web token" })
        }
        const userId = decodedData?.userId

        const user = await UserModel.findById(userId)

        if (!user) {
            throw new Error(" user not found")
        }

        const userObject = {
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role
        }
        return res.status(200).json({ status: "success", user: userObject })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}
