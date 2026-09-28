import { calculateCommission, getCommissionById, getSellerCommissions } from "../controllers/commission.controller.js";
import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewear.js";

const router = Router();
router.use(verifyJWT);

router.route("/calculate-commission/:sellerId/:orderId" ).post(calculateCommission);
router.route("/commission/:commissionId" ).get(getCommissionById);
router.route("/seller-commissions/:sellerId" ).get(getSellerCommissions);

export default router;  