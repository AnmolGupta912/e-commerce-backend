import mongoose, { Schema } from "mongoose";

const cartItemSchema = Schema(
    {
        cartId: {
            type: Schema.Types.ObjectId,
            ref: "Cart",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const CartItem = mongoose.model("CartItem", cartItemSchema);