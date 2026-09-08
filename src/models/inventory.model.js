import mongoose, { Schema } from "mongoose";
import moogooseaggregatePaginate from "mongoose-aggregate-paginate-v2";

const inventorySchema = new Schema(
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

inventorySchema.plugin(moogooseaggregatePaginate);

export const Inventory = mongoose.model("Inventory", inventorySchema);