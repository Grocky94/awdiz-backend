import jwt from "jsonwebtoken";
import UserModel from "../../test-6/model/User.model.js";

export const checkSeller = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.json({ status: "error", message: "token is mandatory" })

        const decodedData = jwt.verify(token, process.env.JWT_ENCRYPT)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid" })
        }
        const userId = decodedData?.userId;

        const user = await UserModel.findById(userId)
        console.log(userId,"userId")
        if (!user || user?.role != "Seller") {
            return res.status(404).json({ status: "error", message: "user not valid to add product from middleware" })
        }

        next();

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }

}