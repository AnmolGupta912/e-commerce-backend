import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Payment} from "../models/payment.model.js";
import {Order} from "../models/order.model.js";
import mongoose from "mongoose";
import { nanoid } from "nanoid";


export const calculateOrderAmount = async (orderId) => {
    const order = await Order.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(orderId) }
        },
        {
            $set: {
                discountAmount:{
                    $cond: {
                        if: { $eq: ["$subscriptionId", null] }, // check if subscriptionId is not null
                        then: { $multiply: ["$totalAmount", 0.1] },
                        else: 0
                    }
                },
                //{ $multiply: ["$totalAmount", 0.1] }, // apply a 10% discount
                taxAmount: { $multiply: ["$totalAmount", 0.08] }, // apply an 8% tax
                finalAmount: { $subtract: [{ $add: ["$totalAmount", "$taxAmount"] }, "$discountAmount"] } // calculate the final amount
            }
        }
    ])

    return order[0];
}
    


const createPayment = asyncHandler(async (req, res) => {
    // const { orderId, amount, method, transactionId } = req.body;

    const { method } = req.body;
    const orderId = req.params.orderId;

    // apply discounts, taxes, and other calculations to the order amount before creating the payment
    const order = await calculateOrderAmount(orderId);
    console.log("Order after calculations:", order);

    if (!order) {
        throw new ApiError(404, "Order not found!!!");
    }

    const payment = await Payment.create({
        orderId,
        amount: order?.total,
        method,
        transactionId: nanoid(),
        paidAt: new Date()
    });

    if (!payment) {
        throw new ApiError(500, "Failed to create payment!!!");
    }

    return res.status(201).json(new ApiResponse(201, payment, "Payment created successfully!!!"));
})


const getPaymentByOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;

    const payment = await Payment.findOne({ orderId });     

    if (!payment) {
        throw new ApiError(404, "Payment not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, payment, "Payment found successfully!!!"));
})


const updatePaymentStatus = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;

    const payment = await Payment.findOne({ orderId });

    if (!payment) {
        throw new ApiError(404, "Payment not found!!!");
    }

    payment.status = req.body.status;
    const updatedPayment = await payment.save({validateBeforeSave: false});

    return res.status(200).json(new ApiResponse(200, updatedPayment, "Payment status updated successfully!!!"));
})

export {
    createPayment,
    getPaymentByOrder,
    updatePaymentStatus
}