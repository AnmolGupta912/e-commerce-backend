import mongoose, { Schema } from "mongoose";

const sellerSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        storeName: {
            type: String,
            required: true
        },
        commissionRate: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Seller = mongoose.model("Seller", sellerSchema);