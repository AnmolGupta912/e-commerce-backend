import {
    createReturn,
    getReturnById,
    updateReturnById,
    deleteReturnById,
    toggleReturnStatus
} from "../controllers/return.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewear.js";
import express from "express";
const router = express.Router();

router.use(verifyJWT);

router.route("/create-return/:orderId/:orderItemId").post(createReturn);
router.route("/get-return/:returnId").get(getReturnById);
router.route("/update-return/:returnId").put(updateReturnById);
router.route("/delete-return/:returnId").delete(deleteReturnById);
router.route("/toggle-return-status/:returnId").put(toggleReturnStatus);

export default router;