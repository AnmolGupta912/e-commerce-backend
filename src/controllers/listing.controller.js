import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Listing } from "../models/listing.model.js";

const createListing = asyncHandler(async (req, res) => {
    const { price, stock } = req.body;
    const productId = req.params.productId;
    const sellerId = req.params.sellerId;

    if (!productId || !price || !stock || !sellerId) {
        throw new ApiError(400, "productId, price, stock, and sellerId are required!!!");
    }

    const listing = await Listing.create({
        productId,
        price,
        stock,
        sellerId
    });

    if (!listing) {
        throw new ApiError(500, "Failed to create listing");
    }

    return res.status(201).json(new ApiResponse(201, listing, "Listing created successfully"));
})


const getAllListings = asyncHandler(async (req, res) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    const listings = await Listing.aggregatePaginate(Listing.aggregate(), options);

    if (!listings) {
        throw new ApiError(404, "No listings found");
    }
    
    return res.status(200).json(new ApiResponse(200, listings, "All listings fetched successfully"));
})


const getListingById = asyncHandler(async (req, res) => {
    const listingId = req.params.listingId;

    if (!listingId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }   

    const listing = await Listing.findById(listingId);

    if (!listing) {
        throw new ApiError(404, "Listing not found!!!");
    }
    
    return res.status(200).json(new ApiResponse(200, listing, "Listing fetched successfully"));
})


const updateListingById = asyncHandler(async (req, res) => {
    const listingId = req.params.listingId;
    const { price, stock } = req.body;

    const updateData = {};
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;

    const listing = await Listing.findByIdAndUpdate(listingId, updateData, { new: true });

    if (!listing) {
        throw new ApiError(404, "Listing not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, listing, "Listing updated successfully"));
})


const deleteListingById = asyncHandler(async (req, res) => {
    const listingId = req.params.listingId;

    if (!listingId) {
        throw new ApiError(400, "Bad request: Missing required parameters!!!");
    }
     
    const listing = await Listing.findByIdAndDelete(listingId);

    if (!listing) {
        throw new ApiError(404, "Listing not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, listing, "Listing deleted successfully"));
})

export {
    createListing,
    getAllListings,
    getListingById,
    updateListingById,
    deleteListingById
}
