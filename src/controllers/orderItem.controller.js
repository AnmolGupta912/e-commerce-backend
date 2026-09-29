import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OrderItem } from "../models/orderItem.model.js";
import { Listing } from "../models/listing.model.js";
import { Order } from "../models/order.model.js";
import mongoose from "mongoose";

const createOrderItem = asyncHandler(async (req, res) => {
    const { orderId, listingId } = req.params;
    const { quantity } = req.body;

    const userId = req.user._id;
    console.log("quantity", quantity);

    if (!quantity || quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (order.userId.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not allowed to modify this order");
    }

    const listing = await Listing.findById(listingId);

    if (!listing) {
        throw new ApiError(404, "Listing not found");
    }

    const orderItem = await OrderItem.create({
        orderId: order._id,
        listingId: listing._id,
        quantity,
        price: listing.price,
    });

    if (!orderItem) {
        throw new ApiError(500, "Order item creation failed");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                orderItem,
                "Order item created successfully"
            )
        );
});

const getOrderItems = asyncHandler(async (req, res) => {
    const options = {
        "page": req.query.page || 1,
        "limit": req.query.limit || 10,
        "sort": { "createdAt": -1 }
    }

    const orderItemsCollection =  await OrderItem.aggregatePaginate(OrderItem.aggregate(), options);

    if (!orderItemsCollection) {
        throw new ApiError(404, "Order items not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, orderItemsCollection, "Order items fetched successfully"));
});

const getOrderItemById = asyncHandler(async (req, res) => {
    const orderItemId = req.params.orderItemId;

    if (!orderItemId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const options = {
        "page": req.query.page || 1,
        "limit": req.query.limit || 10,
        "sort": { "createdAt": -1 }
    }

    const orderItem = await OrderItem.aggregate([
        {
            $match: { "$id" : new mongoose.Types.ObjectId(orderItemId) }
        }])

    const orderItemsCollection =  await OrderItem.aggregatePaginate(orderItem, options);

    if (!orderItemsCollection) {
        throw new ApiError(404, "Order item not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, orderItemsCollection, "Order item fetched successfully"));
});

// getOrderItems()
// getOrderItemById()

export { createOrderItem, getOrderItems, getOrderItemById };