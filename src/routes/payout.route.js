import { createPayout, getSellerPayouts, getPayoutById, updatePayoutbyId } from "../controllers/payout.controller.js";
import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js";

const router = express.Router();
router.use(verifyJWT)

router.route("/create-payout/:orderId/:sellerId").post(createPayout);
router.route("/get-seller-payouts/:sellerId").get(getSellerPayouts);
router.route("/get-payout/:payoutId").get(getPayoutById);
router.route("/update-payout/:payoutId").put(updatePayoutbyId);

export default router;