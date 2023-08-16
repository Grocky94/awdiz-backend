
import ProductModel from "../model/Product.model.js";

export const addProduct = async (req, res) => {
    try {
        const { name, price, image, category, token } = req.body;
        if (!name || !price || !image || !category || !token) return res.status(404).json({ status: "error", message: "all field are mandatory" })

        const product = new ProductModel({ name, price, image, category });

        await product.save();

        return res.status(201).json({ status: "success" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}