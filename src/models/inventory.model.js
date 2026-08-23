import mongoose, { Schema } from "mongoose";

const inventorySchema = Schema(
    {
        quantity: {
            type: Number,
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        warehouseId: {
            type: Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);