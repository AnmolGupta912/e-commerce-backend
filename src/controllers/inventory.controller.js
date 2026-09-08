import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  {Inventory} from "../models/inventory.model.js";


const createInventory = asyncHandler(async (req, res) => {
    const { productId, warehouseId } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.create({
        productId,
        warehouseId,
        quantity
    });

    return res.status(201).json(new ApiResponse(201, inventory, "Inventory created successfully"));
})


const getInventoryById = asyncHandler(async (req, res) => {
    const inventoryId = req.params.id;

    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
        throw new ApiError(404, "Inventory not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, inventory, "Inventory fetched successfully"));
})



const updateInventoryById = asyncHandler(async (req, res) => {
    const inventoryId = req.params.id;
    const { quantity } = req.body;

    const inventory = await Inventory.findByIdAndUpdate(
        inventoryId,
        { quantity },
        { new: true }
    );

    if (!inventory) {
        throw new ApiError(404, "Inventory not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, inventory, "Inventory updated successfully"));
})



const deleteInventoryById = asyncHandler(async (req, res) => {
    const inventoryId = req.params.id;

    const inventory = await Inventory.findByIdAndDelete(inventoryId);

    if (!inventory) {
        throw new ApiError(404, "Inventory not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, inventory, "Inventory deleted successfully"));
})


const getAllInventories = asyncHandler(async (req, res) => {

    const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        sort: { createdAt: -1 }
    };

    const inventories = await Inventory.aggregatePaginate(Inventory.aggregate(), options);

    if (!inventories) {
        throw new ApiError(502, "Something went wrong while fetching inventories!!!");
    }

    return res.status(200).json(new ApiResponse(200, inventories, "Successfully fetched all inventories!!!"));
})

export {
    createInventory,
    getInventoryById,
    updateInventoryById,
    deleteInventoryById,
    getAllInventories
}

