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


const getReturnById = asyncHandler(async (req, res) => {
    const returnId = req.params.returnId;

    if (!returnId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const returnRequest = await Return.findById(returnId);  

    if (!returnRequest) {
        throw new ApiError(404, "Return request not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, returnRequest, "Return request fetched successfully"));
})


const updateReturnById = asyncHandler(async (req, res) => {
    const returnId = req.params.returnId;
    const { reason } = req.body;

    if (!returnId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    if (!returnRequest) {
        throw new ApiError(404, "Return request not found!!!");
    }

    const returnItem = await Return.findByIdAndUpdate(returnId, { reason }, { new: true });

    return res.status(200).json(new ApiResponse(200, returnItem, "Return request updated successfully"));
})


const deleteReturnById = asyncHandler(async (req, res) => {
    const returnId = req.params.returnId;

    if (!returnId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }

    const returnRequest = await Return.findById(returnId);

    if (!returnRequest) {
        throw new ApiError(404, "Return request not found!!!");
    }

    const removedReturn = await Return.findByIdAndDelete(returnId);

    return res.status(200).json(new ApiResponse(200, removedReturn, "Return request deleted successfully"));
})


const toggleReturnStatus = asyncHandler(async (req, res) => {
    const returnId = req.params.returnId;
    const { status } = req.body;        

    if (!returnId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }   

    const toggleReturn = await Return.findByIdAndUpdate(returnId, { status }, { new: true });

    if (!toggleReturn) {
        throw new ApiError(404, "Return request not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, toggleReturn, "Return status updated successfully"));
})

export {
    createReturn,
    getReturnById,
    updateReturnById,
    deleteReturnById,
    toggleReturnStatus
}

// hello from anmol gupta