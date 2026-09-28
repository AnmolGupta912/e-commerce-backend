import {
    createListing,
    getAllListings,
    getListingById,
    updateListingById,
    deleteListingById
} from "../controllers/listing.controller.js";

import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js"

const router = express.Router();
router.use(verifyJWT);

router.route("/create-listing/:productId/:sellerId").post(createListing);
router.route("/get-all-listings").get(getAllListings);
router.route("/get-listing/:listingId").get(getListingById);
router.route("/update-listing/:listingId").put(updateListingById);
router.route("/delete-listing/:listingId").delete(deleteListingById);


export default router;