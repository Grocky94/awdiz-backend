import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    surname: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    confirmpassword: {
        type: String,
        require: true
    }
})

export default mongoose.model("User", userSchema);