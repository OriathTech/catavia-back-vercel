import { Schema, model } from "mongoose";

const elementSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online' 
    },
    category: {
        type: String,
        enum: ['extra', 'ingredient'],
        default: 'extra'
    }
})

const elementModel = model("Elements", elementSchema);

export default elementModel;