import mongoose, { Schema } from "mongoose";

const returnSchema = new Schema(
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
            enum: ["pending", "approved", "rejected"],
            default: "pending"
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