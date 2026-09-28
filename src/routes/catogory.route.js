import {
    createCategory,
    addCategoryParentId,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} from "../controllers/category.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewear.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-category").post(createCategory);
router.route("/add-catogory-parent/:categoryId/:parentId").put(addCategoryParentId);
router.route("/get-all-categories").get(getAllCategories);
router.route("/get-category/:categoryId").get(getCategoryById);
router.route("/update-category/:categoryId").put(updateCategoryById);
router.route("/delete-category/:categoryId").delete(deleteCategoryById);

export default router;