import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";

const createCart = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request!!!");
    }

    const cart = await Cart.create({ userId });
    return res.status(201).json(new ApiResponse(201, cart, "Cart created successfully"));  
})

const toggleCartStatus = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request!!!");
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found !!!");
    }

    cart.status = cart.status === "active" ? "inactive" : "active";
    const updatedCart = await cart.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, updatedCart, "Cart status toggled successfully"));
})



export { createCart, toggleCartStatus };