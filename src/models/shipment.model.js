import mongoose, { Schema } from "mongoose";

const shipmentSchema = new Schema(
    {
        warehouseId: {
            type: Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },
        shippedAt: {
            type: Date,
        },
        trackingNumber: {
            type: String
        },
        status: {
            type: String,
            enum: ["pending", "shipped", "delivered"],
            default: "pending"
        },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        deliveredAt: {
            type: Date
        },
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Shipment = mongoose.model("Shipment", shipmentSchema);