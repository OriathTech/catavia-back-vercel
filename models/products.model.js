import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: [{
            type: String,
            enum: ['salados', 'chocolatería', 'tortas', 'tartas', 'postres', 'individuales', 'frutales', 'regalos', 'temporada', 'catering', 'desayunos', 'panificados']
        }],
        default: []
    },
    status: {
        type: String,
        enum: ["offline", "online", "featured"],
        default: "offline"
    },
    price: {
        type: Number,
        default: 0
    },
    thumbnails: {
        first: {
            url: {
                type: String,
                default: null
            }
        },
        second: {
            url: {
                type: String,
                default: null
            }
        },
        third: {
            url: {
                type: String,
                default: null
            }
        },
    },
    elements: {
        type: [
            {
                _id: {
                    type: String,
                    required: true
                },       
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                status: {
                    type: String,
                    default: "online"
                },
                category: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        ],
        default: []
    }
})

const productModel = model("Products", productSchema);

export default productModel;