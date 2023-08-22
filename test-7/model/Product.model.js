import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

})
export default mongoose.model("product", productSchema)