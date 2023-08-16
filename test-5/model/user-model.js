import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    confirmpassword: {
        type: Number,
        require: true,
    },
    role: {
        type: String,
        enum: ["Buyer", "Seller", "Admin"],
        default: "Buyer"
    }

})

export default mongoose.model("user", userSchema);