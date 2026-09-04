import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const cartItemSchema = new Schema(
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

cartItemSchema.plugin(mongooseAggregatePaginate);

export const CartItem = mongoose.model("CartItem", cartItemSchema);