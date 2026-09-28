import {
    createPlan,
    getAllPlans,
    getPlanById,
    updatePlan,
    deletePlan
} from "../controllers/plan.controller.js";

import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js"

const router = express.Router();
router.use(verifyJWT);

router.route("/create-plan").post(createPlan);
router.route("/get-all-plans").get(getAllPlans);
router.route("/get-plan/:planId").get(getPlanById);
router.route("/update-plan/:planId").put(updatePlan);
router.route("/delete-plan/:planId").delete(deletePlan);

export default router;