import UserModel from "../../backend/model/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const { userData } = req.body;
        const { name, email, password, role } = userData;
        if (!name || !email || !password || !role) return res.json({ success: false, message: "All fields are mandtory.." })

        const isEmailExist = await UserModel.find({ email: email })
        if (isEmailExist.length) {
            return res.json({ success: false, message: "Email is exist, try diffrent email." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({ name, email, password: hashedPassword, role });

        await user.save();

        return res.json({ success: true, message: "User registered Successfully." })

    } catch (error) {
        return res.json({ success: false, message: error })
    }
}

export const Login = async (req, res) => {
    try {

        const { email, password } = req.body.userData;
        if (!email || !password) return res.status(404).json({ success: false, message: "All fields are mandatory" })

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User not found.." })
        }
        if (user.blocked) {
            return res.json({ success: false, message: "your are block , contact us!!" })
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
            return res.json({ success: true, message: "login successfull", user: userObject, token: token })
        }
        return res.json({ success: false, message: "password is wrong" })
    } catch (error) {
        return res.json({ success: false, message: error })
    }
}
export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is required!" })

        const decodedData = jwt.verify(token, process.env.err_Auth);
        // console.log(decodedData, "decodedData")

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Not valid json token.." })
        }
        const userId = decodedData?.userId

        const user = await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found.." })
        }

        const userObject = {
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role
        }
        return res.status(200).json({ success: true, user: userObject })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
