import jwt from "jsonwebtoken";
import userModel from "../../test-5/model/user-model.js";

export const checkSeller = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ status: "error", message: "tokken is mandate" })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid" })
        }
        const userId = decodedData?.userid;

        const user = await userModel.findById(userId);

        if (!user || user?.role != "Seller") {
            return res.status(404).json({ status: "error", message: "user not valid to add product from middleware" })
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: error.message, status: "error" })
    }
}