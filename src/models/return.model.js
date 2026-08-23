import mongoose, { Schema } from "mongoose";

const returnSchema = Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        orderItemId: {
            type: Schema.Types.ObjectId,
            ref: "OrderItem",
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        returnedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export const Return = mongoose.model("Return", returnSchema);