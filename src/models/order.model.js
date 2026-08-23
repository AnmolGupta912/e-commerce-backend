import mongoose, {Schema}  from "mongoose";


const orderSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        total: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            required: true
        },
        subscriptionId: {
            type: Schema.Types.ObjectId,
            ref: "Subscription"
        },
        placedAt: {
            type: Date(),
            required: true
        }
    },
    {
        timestamp: true
    }
)

export const Order = mongoose.model("Order", orderSchema)