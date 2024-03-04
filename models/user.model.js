import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
})

const userModel = model("Users", userSchema);

export default userModel;