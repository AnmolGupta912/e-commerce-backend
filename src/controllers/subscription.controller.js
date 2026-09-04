import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Subscription} from "../models/subscription.model.js";

const subscribeToPlan = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const planId = req.params.planId;

    if (!planId || !mongoose.Types.ObjectId.isValid(planId)) {
        throw new ApiError(400, "Invalid plan ID");
    }

    const renewAt = new Date();
    renewAt.setMonth(renewAt.getMonth() + 1);


    const subscription = await Subscription.create({
        userId,
        planId,
        renewAt,
    });


    return res.status(201).json(new ApiResponse(201, subscription, "Subscription created successfully"));

})


const getMySubscription = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const subscription = await Subscription.findOne({ userId })

    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    return res.status(200).json(new ApiResponse(200, subscription, "Subscription retrieved successfully"));

})


const cancelSubscription = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const subscription = await Subscription.findOneAndDelete({ userId });

    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    return res.status(200).json(new ApiResponse(200, subscription, "Subscription cancelled successfully"));

})


const renewSubscription = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    const renewAt = new Date();
    renewAt.setMonth(renewAt.getMonth() + 1);

    subscription.renewAt = renewAt;
    const renewSubscription = await subscription.save({validateBeforeSave: false});

    return res.status(200).json(new ApiResponse(200, renewSubscription, "Subscription renewed successfully"));
})

export {
    subscribeToPlan,
    getMySubscription,
    cancelSubscription,
    renewSubscription
}