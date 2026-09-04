import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { CartItem } from "../models/cartItem.model.js";
import { User } from "../models/user.model.js";

const createOrder = asyncHandler(async (req, res) => {
  // get userId from request object
  // get cart items from cartItem model using userId
  // calculate total from cart items
  // initialize status as "pending"
  // check if subscriptionId present in user document, if yes, add subscriptionId to order
  // create order with userId, total, status, subscriptionId, placedAt
  // return order in response

  const userId = req.user?._id;

  const user = await User.findById(userId).select("subscriptionId");
  const cartItems = await CartItem.aggregate([
    { $match: { userId: userId } },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$quantity", "$price"] } },
      },
    },
  ]);

  if (!cartItems || cartItems.length === 0) {
    throw new ApiError(404, "No cart items found for the user!!!");
  }

  // if user has a subscriptionId, apply a 10% discount to the total
  const total = cartItems[0].total;

  const order = await Order.create({
    userId,
    total,
    status: "pending",
    subscriptionId: user.subscriptionId || undefined, // if user has a subscriptionId, add it to the order, else leave it undefined
  });

  if (!order) {
    throw new ApiError(500, "Failed to create order!!!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully!!!"));
});

const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;

    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };

    const orders = await Order.aggregatePaginate(
      Order.find({ userId }),
      options
    );

    if (!orders) {
      throw new ApiError(404, "No orders found for the user!!!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "Orders fetched successfully!!!"));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch orders!!!");
  }
});


const getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;

    if (!orderId) {
        throw new ApiError(400, "orderId is required in the request params!!!");
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, order, "Order fetched successfully!!!"));
});


const updateOrderStatus = asyncHandler(async (req, res) => {});


const cancelOrder = asyncHandler(async (req, res) => {
    // const userId = req.user?._id;

    const orderId = req.params.orderId;

    if (!orderId) {
        throw new ApiError(400, "orderId is required in the request params!!!");
    }

    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, order, "Order cancelled successfully!!!"));

});

export {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
};