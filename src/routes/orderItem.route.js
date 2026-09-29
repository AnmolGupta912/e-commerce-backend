import {createOrderItem, getOrderItems, getOrderItemById } from "../controllers/orderItem.controller.js";
import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js"

const router = express.Router();
router.use(verifyJWT);

router.route("/create-order-item/:orderId/:listingId").post(createOrderItem);
router.route("/get-order-items").get(getOrderItems);
router.route("/get-order-item/:orderItemId").get(getOrderItemById);

export default router;  
