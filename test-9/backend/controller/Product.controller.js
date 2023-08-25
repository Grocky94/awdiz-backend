import ProductModel from "../../backend/model/Product.model.js";
import jwt from "jsonwebtoken"

export const addProduct = async (req, res) => {
    try {
        const { name, price, image, category, token } = req.body;
        if (!name || !price || !image || !category || !token) return res.status(404).json({ status: "error", message: "all fields are mandatory" });

        const decodedData = jwt.verify(token, process.env.err_Auth)

        if (!decodedData) throw new Error({ success: "false", message: "Token not valid" })

        const userId = decodedData?.userId;

        const product = new ProductModel({ name: name, price: price, image: image, category: category, userId: userId })

        await product.save()

        return res.status(201).json({ status: "success" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const allProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({ blocked: false, verified: true });
        if (products.length) {
            return res.status(200).json({ status: "success", products: products })
        }
        return res.status(404).json({ status: "error", message: "no products found" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const getMyProducts = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.err_Auth);

        if (!decodedData) {
            throw new Error("invalid token received")
        }

        const userId = decodedData?.userId;

        const yourProducts = await ProductModel.find({ userId: userId })

        if (yourProducts.length) {
            return res.status(200).json({ status: "success", products: yourProducts })
        }
        throw new Error("No products found")

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const updateYourProducts = async (req, res) => {
    try {
        const { productId, name, image, price, category, token } = req.body

        if (!token) throw new Error({ success: "false", message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_ENCRYPT)

        if (!decodedData) {
            throw new Error({ Success: "false", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const updatedProduct = await ProductModel.findOneAndUpdate({ _id: productId, userId: userId }, { name, image, price, category }, { new: true })

        if (updatedProduct) {
            return res.status(200).json({ status: "Sucess", product: updatedProduct })
        }
        throw new Error({ success: "false", message: "You are trying to update product which is not yours.." })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}
// delete only by seller 
export const deleteYourProduct = async (req, res) => {
    try {
        const { productId, token } = req.body;

        if (!productId) return res.status(404).json({ status: "error", message: "Product id is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decodedData.userId;

        const isDeleted = await ProductModel.findOneAndDelete({ _id: productId, userId: userId })
        if (isDeleted) {
            return res.status(200).json({ success: true, message: "Product Deleted Successfully." })
        }

        throw new Error("Mongodb error")

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const rateProduct = async (req, res) => {
    try {
        const { productId, rating } = req.body;

        const ratingProduct = await ProductModel.findByIdAndUpdate(productId, { $push: { ratings: rating } }, { new: true })

        if (ratingProduct) {
            return res.status(200).json({ success: true, message: "user have rate selected product", product: ratingProduct })
        }

        throw new Error({ status: 500, message: "MongoDb error" })
    } catch (error) {
        throw new Error({ success: false, message: error.message })
    }
}

export const addComment = async (req, res) => {
    try {
        const { productId, comment, userId } = req.body

        const productComment = await ProductModel.findByIdAndUpdate(productId, { $push: { comments: { comments: comment }},userId:userId }, { new: true })

        if (productComment) {
            return res.status(200).json({ success: true, message: "user comment has been added", product: productComment })
        }

        throw new Error({ success: false, Message: error.message })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}