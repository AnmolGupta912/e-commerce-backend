import mongoose, { Schema } from "mongoose";
import moogooseaggregatePaginate from "mongoose-aggregate-paginate-v2";

const warehouseSchema = new Schema(
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

warehouseSchema.plugin(moogooseaggregatePaginate);

export const Warehouse = mongoose.model("Warehouse", warehouseSchema);