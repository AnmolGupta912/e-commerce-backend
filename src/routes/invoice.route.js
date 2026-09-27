import { createInvoice, getInvoiceByOrderId, getInvoice } from "../controllers/invoice.controller.js";  
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js";


const router = Router();

router.use(verifyJWT);


router.route("/create-invoice/:orderId").post(createInvoice)
router.route("/get-invoice/:invoiceId").get(getInvoice);
router.route("/get-invoice-by-order/:orderId").get(getInvoiceByOrderId);

export default router;
