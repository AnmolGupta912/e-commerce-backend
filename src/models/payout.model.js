import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

payoutSchema.plugin(mongooseAggregatePaginate);
export const Payout = mongoose.model("Payout", payoutSchema);