import mongoose, { Schema } from "mongoose";

const commissionSchema = Schema(
    {
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "Seller",
            required: true
        },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        rate: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Commission = mongoose.model("Commission", commissionSchema);