import mongoose, { Schema } from "mongoose";

const userschema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    surname: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    password:{
        type:String,
        require:true,
    },

})

export default mongoose.model("user", userschema)