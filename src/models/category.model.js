import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        //parentId references another category because your diagram allows nested categories.
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

export const Category = mongoose.model("Category", categorySchema);