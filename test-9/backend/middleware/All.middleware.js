import jwt from "jsonwebtoken";
import UserModel from "../../backend/model/User.model.js";

// only for seller
export const checkSeller = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "token is mandatory" })

        const decodedData = jwt.verify(token, process.env.err_Auth)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid" })
        }
        const userId = decodedData?.userId;

        const user = await UserModel.findById(userId)
        // console.log(userId, "userId")
        if (!user || user?.role != "Seller") {
            return res.status(404).json({ success: false, message: "user not valid to add product from middleware" })
        }

        next();

    } catch (error) {
        return res.status(500).json({ success: false, message: error.response?.data.message })
    }

}


// to check if admin user
export const checkAdmin = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ status: "error", message: "Token is mandtory" });

        const decodedData = jwt.verify(token, process.env.err_Auth)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid" })
        }
        const userId = decodedData.userId;

        const user = await UserModel.findById(userId);

        if (!user || user?.role != "Admin") {
            return res.status(404).json({ message: "user not a admin.", status: "error" })
        }

        next();

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}


// check if it valid user
export const checkUser = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            throw new Error({ success: false, message: "Token is manditory..." })
        }

        const decodedData = jwt.verify(token, process.env.err_Auth);

        if (!decodedData) {
            throw new Error({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error({ status: 404, message: "User not valid", status: "error" })
        }

        next();

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}