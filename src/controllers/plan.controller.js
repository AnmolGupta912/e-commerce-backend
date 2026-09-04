import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Plan} from "../models/plan.model.js";


const createPlan = asyncHandler(async (req, res) => {
    const { name, price, interval } = req.body;

    if (!name || !price || !interval) {
        throw new ApiError(400, "All fields are required");
    }

    const plan = await Plan.create({
        name,
        price,
        interval
    });

    if (!plan) {
        throw new ApiError(400, "Plan creation failed");
    }

    return res.status(201).json(new ApiResponse(201, plan, "Plan created successfully!!!"));
})


const getAllPlans = asyncHandler(async (req, res) => {

    const plans = await Plan.find();

    if (!plans) {
        throw new ApiError(404, "No plans found");
    }

    return res.status(200).json(new ApiResponse(200, plans, "Plans retrieved successfully"));
})


const getPlanById = asyncHandler(async (req, res) => {
    const planId = req.params.planId;

    const plan = await Plan.findById(planId);

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    return res.status(200).json(new ApiResponse(200, plan, "Plan retrieved successfully"));

})


const updatePlan = asyncHandler(async (req, res) => {
    const planId = req.params.planId;
    const { name, price, interval } = req.body;

    if (!planId || !mongoose.Types.ObjectId.isValid(planId)) {
        throw new ApiError(400, "Invalid plan ID");
    }

    if (!name || !price || !interval) {
        throw new ApiError(400, "All fields are required");
    }

    const plan = await Plan.findByIdAndUpdate(planId, { name, price, interval }, { new: true });

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    return res.status(200).json(new ApiResponse(200, plan, "Plan updated successfully"));
})


const deletePlan = asyncHandler(async (req, res) => {
    const planId = req.params.planId;

    if (!planId || !mongoose.Types.ObjectId.isValid(planId)) {
        throw new ApiError(400, "Invalid plan ID");
    }

    const plan = await Plan.findByIdAndDelete(planId);

    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    return res.status(200).json(new ApiResponse(200, plan, "Plan deleted successfully"));
})

export {
    createPlan,
    getAllPlans,
    getPlanById,
    updatePlan,
    deletePlan
}