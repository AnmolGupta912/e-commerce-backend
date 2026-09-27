import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { CartItem } from "../models/cartItem.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createOrder = asyncHandler(async (req, res) => {
  // get userId from request object
  // get cart items from cartItem model using userId
  // calculate total from cart items
  // initialize status as "pending"
  // check if subscriptionId present in user document, if yes, add subscriptionId to order
  // create order with userId, total, status, subscriptionId, placedAt
  // return order in response

  const userId = req.user?._id;
  const cartId = req.params.cartId;

  const totalObject = await CartItem.aggregate([
    {
      $match: { cartId: new mongoose.Types.ObjectId(cartId) },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productInfo"
      }
    },
    {
      $unwind: "$productInfo"
    },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$quantity", "$productInfo.price" ] } },
      }
    },
    {
      $project: {
        _id: 0,
        total: 1,
      }
    }
  ])

  const total = totalObject[0]?.total || 0;

  const user = await User.findById(userId);

  const order = await Order.create({
    userId,
    total: total,
    status: "pending",
    placedAt: new Date(),
    subscriptionId: user?.subscriptionId || undefined, 
    // if user has a subscriptionId, add it to the order, else leave it undefined
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

    const AggregateOrder = Order.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $project: {
          userId: 1,
          total: 1,
          status: 1,
        }
      }
    ]);

    const orders = await Order.aggregatePaginate(
      AggregateOrder,
      options
    );

    if (!orders) {
      throw new ApiError(404, "No orders found for the user!!!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "Orders fetched successfully!!!"));
  } catch (error) {
    throw new ApiError(500, error.message ||"Failed to fetch orders!!!");
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


const updateOrderStatus = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;

    if (!orderId) {
        throw new ApiError(400, "orderId is required in the request params!!!");
    }

    const { status } = req.body;

    if (!status) {
        throw new ApiError(400, "status is required in the request body!!!");
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
        throw new ApiError(404, "Order not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, order, "Order status updated successfully!!!"));

});


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