import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const planSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        interval: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

planSchema.plugin(mongooseAggregatePaginate);

export const Plan = mongoose.model("Plan", planSchema);