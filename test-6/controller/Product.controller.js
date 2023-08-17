import ProductModel from "../../test-6/model/Product.model.js";
import jwt from "jsonwebtoken"

export const addProduct = async (req, res) => {
    try {
        const { name, price, image, category, token } = req.body;
        if (!name || !price || !image || !category || !token) return res.status(404).json({ status: "error", message: "all fields are mandatory" });

        const decodedData = jwt.verify(token, process.env.JWT_ENCRYPT)

        if (!decodedData) return res.status(404).json({ status: "error", message: "Token not valid" })

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
        const products = await ProductModel.find({});
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

        const decodedData = jwt.verify(token, process.env.JWT_ENCRYPT);

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "invalid token received" })
        }

        const userId = decodedData.userId;

        const yourProducts = await ProductModel.find({ userId: userId })

        if (yourProducts.length) {
            return res.status(200).json({ status: "success", products: yourProducts })
        }
        return res.status(404).json({ status: "error", message: "No products found" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const updateYourProducts = async (req, res) => {
    try {
        const { productId, name, image, price, category, token } = req.body

        if (!token) return res.status(404).json({ status: "error", message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_ENCRYPT)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const updatedProduct = await ProductModel.findOneAndUpdate({ _id: productId, userId: userId }, { name, image, price, category }, { new: true })

        if (updatedProduct) {
            return res.status(200).json({ status: "Sucess", product: updatedProduct })
        }
        return res.status(404).json({ status: "error", message: "You are trying to update product which is not yours.." })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}