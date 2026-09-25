import {Router} from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductDetailsById,
    updateProductImageById,
    deleteProductById
} from "../controllers/product.controller.js";
import {uplaoder as uploader} from "../middlewares/multer.middlewear.js";

const router = Router();



router.route("/create-product").post(
    uploader.single("productImage"),
    createProduct);

// const upload = uploader.single("productImage");
// console.log("file upload", upload)

router.route("/get-all-products").get(getAllProducts);

router.route("/get-product/:productId").get(getProductById);
router.route("/update-product-details/:productId").put(updateProductDetailsById);
router.route("/update-product-image/:productId").put(updateProductImageById);
router.route("/delete-product/:productId").delete(deleteProductById);


export default router