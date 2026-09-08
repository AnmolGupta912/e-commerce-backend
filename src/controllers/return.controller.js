import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Return} from "../models/return.model.js";


const createReturn = asyncHandler(async (req, res) => {
    const { orderId, orderItemId } = req.params;
    const reason = req.body.reason;

    const returnRequest = await Return.create({
        orderId,
        orderItemId,
        reason,
        returnedAt: new Date()
    });

    if (!returnRequest) {
        throw new ApiError(400, "Return request creation failed!!!");
    }

    return res.status(201).json(new ApiResponse(201, returnRequest, "Return request created successfully"));

})


const getReturnById = asyncHandler(async (req, res) => {})


const updateReturnById = asyncHandler(async (req, res) => {})


const deleteReturnById = asyncHandler(async (req, res) => {})


const toggleReturnStatus = asyncHandler(async (req, res) => {})
