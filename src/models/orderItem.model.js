import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const orderItemSchema = new Schema(
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

orderItemSchema.plugin(mongooseAggregatePaginate);

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);