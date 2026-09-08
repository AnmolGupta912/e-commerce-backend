import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        method: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending"
        },
        transactionId: {
            type: String
        },
        paidAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export const Payment = mongoose.model("Payment", paymentSchema);