import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CartItem } from "../models/cartItem.model.js";

const createCartItem = asyncHandler(async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    if (!cartId || !productId || !quantity) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const cartItem = await CartItem.create({ cartId, productId, quantity });

    return res.status(201).json(new ApiResponse(201, cartItem, "Cart item created successfully"));
})

const deleteCartItem = asyncHandler(async (req, res) => {
    const cartItemId = req.params.cartItemId;

    if (!cartItemId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const cartItem = await CartItem.findByIdAndDelete(cartItemId);

    if (!cartItem) {
        throw new ApiError(404, "Cart item not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, null, "Cart item deleted successfully"));
})

const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;

    if (!cartItemId || !quantity) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const cartItem = await CartItem.findByIdAndUpdate(
        cartItemId,
        { quantity },
        { new: true }
    );

    if (!cartItem) {
        throw new ApiError(404, "Cart item not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, cartItem, "Cart item quantity updated successfully"));
})

const getCartItemsByCartId = asyncHandler(async (req, res) => {
    const cartId = req.params.cartId;

    if (!cartId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const cartItems = await CartItem.aggregate([
        {
            $match: { cartId: new mongoose.Types.ObjectId(cartId) }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, cartItems, "Cart items retrieved successfully"));
})

export { createCartItem, deleteCartItem, updateCartItemQuantity, getCartItemsByCartId };