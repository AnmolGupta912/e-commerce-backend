import mongoose, { Schema } from "mongoose";

const payoutSchema = Schema(
    {
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "Seller",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        paidAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export const Payout = mongoose.model("Payout", payoutSchema);