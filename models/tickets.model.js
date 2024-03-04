import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    user: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            default: null
        },
        email: {
            type: String,
            default: null
        }
    },
    purchaseDate: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: String,
        required: true
    },
    cart: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    },
    total: {
        type: Number,
        required: true
    }
})

const ticketModel = model("Tickets", ticketSchema);

export default ticketModel;