import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    isNumberVerified: {
        type: Boolean,
        default: false
    },
    otpForNumberVerification:{
        type:Number
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["Buyer", "Seller", "Admin"],
        default: "Buyer"
    },
    cart: {
        type: [String]
    },
    wishlist: {
        type: [String]
    },
    blocked: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("user", userSchema);