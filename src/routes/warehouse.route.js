import {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouseById,
    deleteWarehouseById
} from "../controllers/warehouse.controller.js";
import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js";

const router = express.Router();
router.use(verifyJWT);

router.route("/create-warehouse").post(createWarehouse);
router.route("/get-all-warehouses").get(getAllWarehouses);
router.route("/get-warehouse/:warehouseId").get(getWarehouseById);
router.route("/update-warehouse/:warehouseId").put(updateWarehouseById);
router.route("/delete-warehouse/:warehouseId").delete(deleteWarehouseById);

export default router;