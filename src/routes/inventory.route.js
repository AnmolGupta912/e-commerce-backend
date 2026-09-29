import {
    createInventory,
    getInventoryById,
    updateInventoryById,
    deleteInventoryById,
    getAllInventories
} from "../controllers/inventory.controller.js";

import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js"

const router = express.Router();
router.use(verifyJWT);

router.route("/create-inventory/:productId/:warehouseId").post(createInventory);
router.route("/get-inventory/:inventoryId").get(getInventoryById);
router.route("/update-inventory/:inventoryId").put(updateInventoryById);
router.route("/delete-inventory/:inventoryId").delete(deleteInventoryById);
router.route("/get-all-inventories").get(getAllInventories);    

export default router;

