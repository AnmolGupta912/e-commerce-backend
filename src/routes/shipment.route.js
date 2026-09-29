import { createShipment, getShipment, updateShipmentStatus, trackshipment } from "../controllers/shipment.controller.js";
import express from "express";
import { verifyJWT} from "../middlewares/auth.middlewear.js";

const router = express.Router();
router.use(verifyJWT)


router.route("/create-shipment/:warehouseId/:orderId/:sellerId").post(createShipment);
router.route("/get-shipment/:shipmentId").get(getShipment);
router.route("/update-shipment-status/:shipmentId").put(updateShipmentStatus);
router.route("/track-shipment/:trackingNumber").get(trackshipment);

export default router;

