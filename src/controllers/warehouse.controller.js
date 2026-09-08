import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Warehouse} from "../models/warehouse.model.js";

const createWarehouse = asyncHandler(async (req, res) => {
    const { name, location } = req.body;

    if ([name, location].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!!!");
    }
    const warehouse = await Warehouse.create({
        name,
        location
    });

    if (!warehouse) {
        throw new ApiError(502, "Something went wrong while creating warehouse!!!");
    }

    return res.status(201).json(new ApiResponse(201, warehouse, "Successfully created the warehouse!!!"));
}
)

const getAllWarehouses = asyncHandler(async (req, res) => {
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        sort: { createdAt: -1 }
    };

    const warehouses = await Warehouse.aggregatePaginate(Warehouse.aggregate(), options);

    if (!warehouses) {
        throw new ApiError(502, "Something went wrong while fetching warehouses!!!");
    }   

    return res.status(200).json(new ApiResponse(200, warehouses, "Successfully fetched all warehouses!!!"));
})



const getWarehouseById = asyncHandler(async (req, res) => {
    const warehouseId = req.params.id;

    const warehouse = await Warehouse.findById(warehouseId);

    if (!warehouse) {
        throw new ApiError(404, "Warehouse not found!!!");
    }


    return res.status(200).json(new ApiResponse(200, warehouse, "Successfully fetched the warehouse!!!"));
})


const updateWarehouseById = asyncHandler(async (req, res) => {
    const warehouseId = req.params.id;
    const { name, location } = req.body;

    if ([name, location].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!!!");
    }

    const warehouse = await Warehouse.findByIdAndUpdate(
        warehouseId,
        {
            name,
            location
        },
        { new: true }
    );

    if (!warehouse) {
        throw new ApiError(404, "Warehouse not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, warehouse, "Successfully updated the warehouse!!!"));
})

const deleteWarehouseById = asyncHandler(async (req, res) => {
    const warehouseId = req.params.id;

    const warehouse = await Warehouse.findByIdAndDelete(warehouseId);
    
    if (!warehouse) {
        throw new ApiError(404, "Warehouse not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, warehouse, "Successfully deleted the warehouse!!!"));  
})

export {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouseById,
    deleteWarehouseById
}