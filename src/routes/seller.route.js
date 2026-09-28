import { registerSeller, getSellerProfile, getSellerListings, updateSellerProfile } from "../controllers/seller.controller.js";
import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewear.js";

const router = Router();
router.use(verifyJWT);

router.route("/register-seller" ).post(registerSeller);
router.route("/seller-profile" ).get(getSellerProfile);
router.route("/seller-listings" ).get(getSellerListings);
router.route("/update-seller-profile" ).put(updateSellerProfile);

export default router;
