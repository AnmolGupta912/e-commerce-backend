import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const listingSchema = new Schema(
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

listingSchema.plugin(mongooseAggregatePaginate);

export const Listing = mongoose.model("Listing", listingSchema);

// Listing.aggregatePaginate()