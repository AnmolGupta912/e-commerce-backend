import {
    createPayment,
    getPaymentByOrder,
    updatePaymentStatus
} from "../controllers/payment.controller.js";
import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js";

const router = express.Router();
router.use(verifyJWT)

router.route("/create-payment/:orderId").post(createPayment);
router.route("/get-payment/:orderId").get(getPaymentByOrder);
router.route("/update-payment-status/:orderId").put(updatePaymentStatus);

export default router;