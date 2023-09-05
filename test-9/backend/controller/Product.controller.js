import ProductModel from "../../backend/model/Product.model.js";
import jwt from "jsonwebtoken"
import UserModel from "../model/User.model.js";

export const addProduct = async (req, res) => {
    try {
        const { name, price, image, category } = req.body.productData;
        const { token } = req.body
        // console.log(token, "token getting in product controller")
        if (!name || !price || !image || !category || !token) return res.status(404).json({ success: false, message: "all fields are mandatory" });

        const decodedData = jwt.verify(token, process.env.err_Auth)
        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid" })
        }
        const userId = decodedData?.userId;
        console.log(userId, "userId")
        const product = new ProductModel({ name: name, price: price, image: image, category: category, userId: userId })
        await product.save()
        return res.status(200).json({ success: true, message: "Product added succesfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.response.data.message })
    }
}

export const allProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({}); //blocked: false, verified: true
        if (products.length) {
            return res.status(200).json({ success: true, products: products })
        }
        return res.status(404).json({ success: false, message: "no products found" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getMyProducts = async (req, res) => {
    try {
        const { token } = req.body;
        const decodedData = jwt.verify(token, process.env.err_Auth);
        if (!decodedData) {
            return res.status(404).json({ success: false, message: "invalid token received" })
        }
        const userId = decodedData?.userId;
        const yourProducts = await ProductModel.find({ userId })
        // console.log(yourProducts, "yourProducts")

        if (yourProducts?.length) {
            return res.status(200).json({ success: true, products: yourProducts, message: "product added successfully" })
        }
        return res.status(404).json({ success: false, message: "No products found" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.response?.data.message })
    }

}
export const updateYourProducts = async (req, res) => {
    try {
        const { productId, name, image, price, category } = req.body
        const { token } = req.body
        if (!token) throw new Error({ success: false, message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.err_Auth)

        if (!decodedData) {
            throw new Error({ success: false, message: "Token not valid." })
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
        const { productId } = req.body;
        const { token } = req.headers.authorization

        if (!productId) return res.status(404).json({ status: "error", message: "Product id is mandtory.." })

        const decodedData = jwt.verify(token, process.env.err_Auth);
bn      
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

        const productComment = await ProductModel.findByIdAndUpdate(productId, { $push: { comments: { comments: comment } }, userId: userId }, { new: true })

        if (productComment) {
            return res.status(200).json({ success: true, message: "user comment has been added", product: productComment })
        }

        throw new Error({ success: false, Message: error.message })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}
export const getSingleProductData = async (req, res) => {
    try {
        const { productId } = req.body
        if (!productId) return res.status(404).json({ success: false, message: "ProductId is manditory !!" })

        const product = await ProductModel.findById(productId)
        if (product) {
            return res.status(200).json({ success: true, product })
        }
        return res.status(404).json({ success: false, message: "products details not found" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const addCart = async (req, res) => {
    try {
        const { productId, userId } = req.body

        if (!productId || !userId) return res.status(404).json({ success: false, message: "product is manditory" })
        const user = await UserModel.findByIdAndUpdate(userId, { $push: { cart: productId } })
        if (!user) return res.status(404).json({ success: false, message: "user not found" })
        return res.status(200).json({ success: true, message: "product has been added" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.response.data.message })
    }
}

export const allCartProducts = async (req, res) => {
    try {
        const { token } = req.body

        const decodedData = jwt.verify(token, process.env.err_Auth);
        const userId = decodedData?.userId;

        if (!userId) return res.status(404).json({ success: false, message: "userId is manditory " })

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "user not found" })
        const finalCart = []
        const productArray = user?.cart
        for (let i = 0; i < productArray?.length; i++) {
            const product = await ProductModel.findById(productArray[i])
            if (product) {
                finalCart.push(product)
            }
        }
        return res.status(200).json({ success: true, product: finalCart })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
} 