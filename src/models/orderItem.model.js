import mongoose, { Schema } from "mongoose";

const orderItemSchema = Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        listingId: {
            type: Schema.Types.ObjectId,
            ref: "Listing",
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
    },
    {
        timestamps: true
    }
);

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);