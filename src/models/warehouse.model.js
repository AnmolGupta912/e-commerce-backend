import mongoose, { Schema } from "mongoose";

const warehouseSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Warehouse = mongoose.model("Warehouse", warehouseSchema);