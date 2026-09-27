import mongoose, {Schema}  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        total: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "completed", "cancelled"]
        },
        subscriptionId: {
            type: Schema.Types.ObjectId,
            ref: "Subscription"
        },
        placedAt: {
            type: Date,
            required: true

        }
    },
    {
        timestamps: true
    }
)

orderSchema.plugin(mongooseAggregatePaginate);
export const Order = mongoose.model("Order", orderSchema)