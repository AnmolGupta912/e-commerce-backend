import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            // required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: ""
        },
        productImage: {
            type: String,
            default: "",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model("Product", productSchema);