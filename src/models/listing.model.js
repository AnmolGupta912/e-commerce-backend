import mongoose, { Schema } from "mongoose";

const listingSchema = Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "Seller",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Listing = mongoose.model("Listing", listingSchema);