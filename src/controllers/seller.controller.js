import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Seller } from "../models/seller.model.js";
import { Listing } from "../models/listing.model.js";

const registerSeller = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { storeName, commissionRate } = req.body;

    if (!storeName || !commissionRate) {
        throw new ApiError(400, "Store name and commission rate are required!!!");
    }

    const seller = await Seller.create({
        userId,
        storeName,
        commissionRate
    });

    if (!seller) {
        throw new ApiError(500, "Failed to register seller!!!");
    }

    return res.status(201).json(new ApiResponse(201, seller, "Seller registered successfully!!!"));
})


const getSellerProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(400, "User ID is required!!!");
    }

    const seller = await Seller.findOne({ userId });

    if (!seller) {
        throw new ApiError(404, "Seller profile not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, seller, "Seller profile fetched successfully!!!"));
})


const getSellerListings = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(400, "User ID is required!!!");
    }

    const listings = await Listing.aggregate([
        {
            $match: {
                sellerId: userId
            }
        },
    ])

    if (!listings) {
        throw new ApiError(404, "No listings found for this seller!!!");
    }

    return res.status(200).json(new ApiResponse(200, listings, "Seller listings fetched successfully!!!"));
})


const updateSellerProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        throw new ApiError(400, "User ID is required!!!");
    }

    const { storeName, commissionRate } = req.body;

    const seller = await Seller.findOneAndUpdate(
        userId,
        {
            storeName,
            commissionRate
        },
        { new: true }
    );

    if (!seller) {
        throw new ApiError(404, "Seller profile not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, seller, "Seller profile updated successfully!!!"));
})


export { registerSeller, getSellerProfile, getSellerListings, updateSellerProfile };