import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model("Product", productSchema);