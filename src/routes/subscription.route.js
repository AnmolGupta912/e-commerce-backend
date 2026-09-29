import {
    subscribeToPlan,
    getMySubscription,
    cancelSubscription,
    renewSubscription
} from "../controllers/subscription.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js";

const router = Router();
router.use(verifyJWT);

router.route("/subscribe-to-plan/:planId").post(subscribeToPlan);
router.route("/my-subscription").get(getMySubscription);
router.route("/cancel-subscription").delete(cancelSubscription);
router.route("/renew-subscription").post(renewSubscription);

export default router;