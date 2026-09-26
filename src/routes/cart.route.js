import { createCart, toggleCartStatus, getCartById, clearCart } from "../controllers/cart.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-cart").post(createCart);
router.route("/toggle-cart-status/:cartId").put(toggleCartStatus);
router.route("/get-cart/:cartId").get(getCartById);
router.route("/clear-cart/:cartId").delete(clearCart);

export default router;