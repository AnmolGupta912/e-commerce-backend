import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Commission } from "../models/commission.model.js";
import { Seller } from "../models/selller.model.js";
import { calculateOrderAmount } from "./payment.controller.js";



const calculateCommission = asyncHandler(async (req, res) => {
    const { sellerId, orderId } = req.params;
    const commissionRate = await Seller.findById(sellerId).select("commissionRate");
    const orderAmount = await calculateOrderAmount(orderId);

    const commission = await Commission.create({
        seller: sellerId,
        order: orderId,
        rate: commissionRate,
        amount: orderAmount[0].finalAmount * (commissionRate / 100)
    });

    if (!commission) {
        throw new ApiError(500, "Failed to calculate commission!!!");
    }

    return res.status(201).json(new ApiResponse(201, commission, "Commission calculated successfully"));
})


const getCommissionById = asyncHandler(async (req, res) => {
    const commissionId = req.params.commissionId;

    if (!commissionId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const commission = await Commission.findById(commissionId);

    if (!commission) {
        throw new ApiError(404, "Commission not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, commission, "Commission fetched successfully"));   
})


const getSellerCommissions = asyncHandler(async (req, res) => {
    const sellerId = req.params.sellerId;

    if (!sellerId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const commissions = await Commission.find({ sellerId });

    if (!commissions) {
        throw new ApiError(404, "Commissions not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, commissions, "Commissions fetched successfully"));
})

export { calculateCommission, getCommissionById, getSellerCommissions };
