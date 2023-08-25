import ProductModel from "../../backend/model/Product.model.js";
import UserModel from "../../backend/model/User.model.js"

export const blockUser = async (req, res) => {
    try {

        const { userId } = req.body;

        const user = await UserModel.findByIdAndUpdate(userId, { blocked: true }, { new: true });

        if (user) {
            return res.status(200).json({ status: "Success", message: "Admin successfully block user", user: user })
        }

        throw new Error("internal error, please try again ")

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })

    }
}

export const unBlockUser = (req, res) => {
    try {
        const { userId } = req.body;

        const user = new UserModel.findByIdAndUpdate(userId, { blocked: false }, { new: true })

        if (user) {
            return res.status(200).json({ status: success, message: "Admin successfully unblock user", user: user })
        }

        throw new Error({ success: false, message: "internal error, please try again" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const verifyProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await ProductModel.findByIdAndUpdate(productId, { verified: true }, { new: true })

        if (product) {
            return res.status(200).json({ success: true, message: "admin has verify successfully", product: product })
        }

        return res.status(404).json({ status: "error", message: error.message })

    } catch (error) {
        return res.status(500).json({ sucess: false, error })
    }
}

export const findAllbuyers = async (req, res) => {
    try {

        const allbuyers = await UserModel.find({ role: "Buyer" })

        if (allbuyers.length) {
            return res.status(200).json({ succes: true, user: allbuyers })
        }
        throw new Error({ succes: false, message: "No buyers found" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const findAllSellers = async (req, res) => {
    try {

        allSeller = await UserModel.find({ role: "Seller" })

        if (allSeller.length) {
            return res.status(200).json({ success: true, user: allSeller })
        }
        throw new Error({ succes: false, message: "No Sellers found" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: errro.message })
    }
}
export const findAllProducts = async (req, res) => {
    try {
        const allProduct = await ProductModel.find({});

        if (allProduct.length) {
            return res.status(200).json({ success: true, message: "all products found" })
        }
        throw new Error({ success: false, message: "No Products Found" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const findAllVerifyProduct = async (req, res) => {
    try {
        const allVerifyProduct = await ProductModel.find({ verified: true })
        if (allVerifyProduct.length) {
            return res.status(200).json({ success: true, products: allVerifyProduct })
        }
        throw new Error({ succes: false, message: "No Verify Products found" })

    } catch (error) {
        return res.status(500).json({ satus: "error", message: error.message })
    }
}
// export const findAllUnverifyProduct = () => {
//     try {

//     } catch (error) {
//         return res.status(500).json({ satus: "error", message: error.message })
//     }
// }