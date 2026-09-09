import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Payout } from "../models/payout.model.js";
import { calculateOrderAmount } from "./payment.controller.js";
import { Seller } from "../models/selller.model.js";


const createPayout = asyncHandler(async (req, res) => {
    const { sellerId, orderId } = req.params;
    const seller = await Seller.findById(sellerId).select("commissionRate");

    const orderAmount = await calculateOrderAmount(orderId);


    const amountToPayout = orderAmount[0].finalAmount - (orderAmount[0].finalAmount * (seller.commissionRate / 100));

    const payout = await Payout.create({
        sellerId,
        orderId,
        amount: amountToPayout,
        status: "pending",
        createdAt: new Date()
    });

    if (!payout) {
        throw new ApiError(500, "Failed to create payout!!!");
    }

    return res.status(201).json(new ApiResponse(201, payout, "Payout created successfully"));
})


const getSellerPayouts = asyncHandler(async (req, res) => {
    const sellerId = req.params.sellerId;
    
    if (!sellerId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };

    const payouts = Payout.aggregate([
        {
            $match:{
                sellerId: mongoose.Types.ObjectId(sellerId)
            }
        }
    ])

    const result = await Payout.aggregatePaginate(payouts, options);


    if (!payouts) {
        throw new ApiError(404, "Payouts not found!!!");
    }



    return res.status(200).json(new ApiResponse(200, result, "Payouts fetched successfully"));
})


const getPayoutById = asyncHandler(async (req, res) => {
    const payoutId = req.params.payoutId;

    if (!payoutId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }
    
    const payout = await Payout.findById(payoutId);  

    return res.status(200).json(new ApiResponse(200, payout, "Payout fetched successfully"));
})


const updatePayoutbyId = asyncHandler(async (req, res) => {
    const payoutId = req.params.payoutId;
    const { status } = req.body;

    if (!payoutId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const payout = await Payout.findByIdAndUpdate(payoutId, { status }, { new: true });

    if (!payout) {
        throw new ApiError(404, "Payout not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, payout, "Payout updated successfully"));
})

export { createPayout, getSellerPayouts, getPayoutById, updatePayoutbyId };
