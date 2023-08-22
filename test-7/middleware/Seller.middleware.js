
import jwt from "jsonwebtoken";
import UserModel from "../../test-7/model/User.model.js";

export const checkSeller = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) throw new Error({ success: "false", message: "token is mandatory" })

        const decodedData = jwt.verify(token, process.env.err_Auth)

        if (!decodedData) {
            throw new Error({ success: "false", message: "Token not valid" })
        }
        const userId = decodedData?.userId;

        const user = await UserModel.findById(userId)
        // console.log(userId, "userId")
        if (!user || user?.role != "Seller") {
            throw new Error({ success: "false", message: "user not valid to add product from middleware" })
        }

        next();

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }

}