import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";


const createCategory = asyncHandler(async (req, res) => {
    // get name, description from request body
    const { name, description } = req.body;

    if (!name) {
        throw new ApiError(400, "Name is required!!!");
    }

    const category = await Category.create({
        name,
        description
    });

    if (!category) {
        throw new ApiError(500, "Failed to create category!!!");
    }

    return res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
})


const addCategoryParentId = asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const parentId = req.body.parentId;

    if (!categoryId) {
        throw new ApiError(400, "CategoryId is required!!!");
    }

    if (!parentId) {
        throw new ApiError(400, "ParentId is required!!!");
    }

    const category = await Category.findByIdAndUpdate(
        categoryId,
        {
            parentId
        },
        { new: true }
    );

    if (!category) {
        throw new ApiError(500, "Failed to add parent category!!!");
    }

    return res.status(200).json(new ApiResponse(200, category, "Parent category added successfully"));
})


const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    if (!categories) {
        throw new ApiError(404, "No categories found!!!");
    }

    return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
})


const getCategoryById = asyncHandler(async (req, res) => {

    const categoryId = req.params.categoryId;

    if (!categoryId) {
        throw new ApiError(400, "CategoryId is required!!!");
    }

    const category = await Category.findById(categoryId);

    if (!category) {
        throw new ApiError(404, "Category not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
})


const updateCategoryById = asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;

    if (!categoryId) {
        throw new ApiError(400, "CategoryId is required!!!");
    }
    
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(
        categoryId,
        {
            name,
            description
        },
        { new: true }
    );

    if (!category) {
        throw new ApiError(500, "Failed to update category!!!");
    }

    return res.status(200).json(new ApiResponse(200, category, "Category updated successfully"));

})


const deleteCategoryById = asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;

    if (!categoryId) {
        throw new ApiError(400, "CategoryId is required!!!");
    }

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
        throw new ApiError(500, "Failed to delete category!!!");
    }

    return res.status(200).json(new ApiResponse(200, category, "Category deleted successfully"));
})

export {
    createCategory,
    addCategoryParentId,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}