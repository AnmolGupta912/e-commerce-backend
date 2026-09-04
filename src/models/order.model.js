import mongoose, {Schema}  from "mongoose";


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
            default: "pending"
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

export const Order = mongoose.model("Order", orderSchema)