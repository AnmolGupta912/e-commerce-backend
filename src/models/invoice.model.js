import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        invoiceNumber: {
            type: String,
            required: true,
            unique: true
        },
        amount: {
            type: Number,
            required: true
        },
        issuedAt: {
            type: Date,
            required: true
        },
        taxAmount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);