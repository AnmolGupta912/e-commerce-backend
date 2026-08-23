import mongoose, { Schema } from "mongoose";

const shipmentSchema = Schema(
    {
        warehouseId: {
            type: Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },
        carrier: {
            type: String,
            required: true
        },
        trackingNumber: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Shipment = mongoose.model("Shipment", shipmentSchema);