import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan"
        },
        status: {
            type: String,
            enum: ["active", "cancelled", "expired"],
            default: "active"
        },
        renewAt: {
            type: Date,
            required: true
        },
        
    },
    {
        timestamp: true
    }
)

export const Subscription =  mongoose.model("Subscription", subscriptionSchema)
