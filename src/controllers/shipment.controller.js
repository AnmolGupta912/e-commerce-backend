import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Shipment} from "../models/shipment.model.js";
import { nanoid } from "nanoid";


const createShipment = asyncHandler(async (req, res) => {
    // const warehouseId = req.params.warehouseId;
    // const orderId = req.params.orderId;

    const { warehouseId, orderId, sellerId } = req.params;
    const trackingNumber = nanoid();

    const shipment = await Shipment.create({
        warehouseId,
        orderId,
        trackingNumber,
        sellerId
    });

    return res.status(201).json(new ApiResponse(201, shipment, "Shipment created successfully"));

})


const getShipment = asyncHandler(async (req, res) => {
    const shipmentId =  req.params.shipmentId
    const shipment = await Shipment.findById(shipmentId);

    if (!shipment) {
        throw new ApiError(404, "Shipment not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, shipment, "Shipment fetched successfully"));

})


const updateShipmentStatus = asyncHandler(async (req, res) => {
    const shipmentId = req.params.shipmentId;
    const { status } = req.body;

    const shipment = await Shipment.findByIdAndUpdate(
        shipmentId,
        { status },
        { new: true }
    );

    if (!shipment) {
        throw new ApiError(404, "Shipment not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, shipment, "Shipment status updated successfully"));
})


const trackshipment = asyncHandler(async (req, res) => {
    const trackingNumber = req.params.trackingNumber;

    const shipment = await Shipment.findOne({ trackingNumber });

    if (!shipment) {
        throw new ApiError(404, "Shipment not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, shipment, "Shipment tracked successfully"));
})


export { createShipment, getShipment, updateShipmentStatus, trackshipment };