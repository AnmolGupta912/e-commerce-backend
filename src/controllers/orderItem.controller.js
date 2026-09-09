import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OrderItem } from "../models/orderItem.model.js";

const getOrderItems = asyncHandler(async (req, res) => {
    const orderItems = await OrderItem.find();

    if (!orderItems) {
        throw new ApiError(404, "Order items not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, orderItems, "Order items fetched successfully"));
});

const getOrderItemById = asyncHandler(async (req, res) => {
    const orderItemId = req.params.orderItemId;

    if (!orderItemId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const orderItem = await OrderItem.findById(orderItemId);

    if (!orderItem) {
        throw new ApiError(404, "Order item not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, orderItem, "Order item fetched successfully"));
});

// getOrderItems()
// getOrderItemById()