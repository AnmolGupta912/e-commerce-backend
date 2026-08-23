import mongoose, { Schema } from "mongoose";

const planSchema = Schema(
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

export const Plan = mongoose.model("Plan", planSchema);