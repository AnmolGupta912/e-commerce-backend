import mongoose, { Schema } from "mongoose";

const paymentSchema = Schema(
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
            required: true
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