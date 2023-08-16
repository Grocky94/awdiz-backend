import userModel from "../../test-5/model/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        if (!name || !email || !password || !role) return res.json({ status: "error", message: "all fields are manditory" });

        const isEmailExist = await userModel.find({ email })

        if (isEmailExist.length) {
            return res.json({ status: "error", message: "email alredy exist, use different email" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword, role })

        await user.save();

    } catch (error) {
        res.json({ error: "error", message: error })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ status: "error", message: "All fields are mandatory" })
        }

        const user = await userModel.findOne({ email: email })
        if (!user) return res.json({ status: "error", message: "user not found" });

        const isPasswordRight = await bcrypt.compare(password, user.password)

        if (isPasswordRight) {
            const userobject = {
                name: user.name,
                email: user.email,
                userId: user._id
            }


            const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET)
            return res.json({ status: "success", message: "login successfull", user: userobject, token: token })
        }
        return res.json({ status: "error", message: "password is wrong" })
    } catch (error) {
        res.json({ error: "error", message: error });
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body
        if (!token) return res.status(404).json({ status: "error", message: "Token is required" })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedData, "decodedData")
        if (!decodedData) {
            return req.status(404).json({ status: "error", message: "invalid json web token" })
        }

        const userId = decodedData?.userid

        const user = await userModel.findById(userId)

        if (!user) {
            res.status(404).json({ status: "error", message: "user not found" })
        }

        const userObject = {
            name: user?.name,
            email: user?.email,
            _id: user?._id
        }

        return res.status(200).json({ status: "success", user: userObject })
    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}