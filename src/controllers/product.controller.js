import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { uploadFileOncloudinary } from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
    // get the product details like name price description image from the request body
    // validate the product details
    // check for the image and send it to the cloudinary and get the image url
    // create the product in the database
    // set categoryId to the product if provided in the request body
    // return the product details in the response

    const { name, price, description } = req.body;
    const categoryId = req.body.categoryId || null; 
    
    if (!name || !price ) {
        throw new ApiError(400, "Name and price are required fields!!!");
    }
    
    const productImageLocalPath = req.file[0]?.productImage.path; 

    if (!productImageLocalPath) {
        throw new ApiError(400, "Product image is required!!!");
    }

    const productImageUrl = await uploadFileOncloudinary(productImageLocalPath);
    
    if (!productImageUrl) {
        throw new ApiError(500, "Failed to upload product image to cloudinary!!!");
    }

    const product = await Product.create({
        name,
        price,
        description,
        productImage: productImageUrl,
        categoryId
    });

    if (!product) {
        throw new ApiError(500, "Failed to create product!!!");
    }

    return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
})


const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10
        };

        const products = await Product.aggregatePaginate(Product.find(), options);

        if (!products) {
            throw new ApiError(500, "Failed to fetch all products!!!");
        }

        return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to fetch products!!!");
    }


})


const getProductById = asyncHandler(async (req, res) => {
    // get the productId from the request params
    // find the product by id in the database
    // if product not found, throw an error
    // return the product details in the response

    const productId = req.params.productId;

    if (!productId) {
        throw new ApiError(400, "productId is required in the request params!!!");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found!!!");
    }

    return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
})


const updateProductDetailsById = asyncHandler(async (req, res) => {
    // get the productId from the request params
    // get the product details like name price description from the request body
    // validate the product details
    // update the product in the database
    // return the updated product details in the response

    const productId = req.params.productId;

    if (!productId) {
        throw new ApiError(400, "productId is required in the request params!!!");
    }

    const { name, price, description } = req.body;

    if (!name || !price) {
        throw new ApiError(400, "Name and price are required fields!!!");
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        {
            name,
            price,
            description
        },
        { new: true }
    );

    if (!product) {
        throw new ApiError(500, "Failed to update product Details!!!");
    }

    return res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
})


const updateProductImageById = asyncHandler(async (req, res) => {
    // get the productId from the request params
    // get the product image from req.file
    // validate the product image
    // check for the image and send it to the cloudinary and get the image url
    // update the product image in the database
    // return the updated product details in the response

    const productId = req.params.productId;

    if (!productId) {
        throw new ApiError(400, "productId is required in the request params!!!");
    }

    const productImageLocalPath = req.file[0]?.productImage.path;

    if (!productImageLocalPath) {
        throw new ApiError(400, "Product image is required!!!");
    }

    const productImageUrl = await uploadFileOncloudinary(productImageLocalPath);

    if (!productImageUrl) {
        throw new ApiError(500, "Failed to upload product image!!!");
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        {
            productImage: productImageUrl
        },
        { new: true }
    );

    if (!product) {
        throw new ApiError(500, "Failed to update product image!!!");
    }

    return res.status(200).json(new ApiResponse(200, product, "Product image updated successfully"));
})


const deleteProductById = asyncHandler(async (req, res) => {
    // get the productId from the request params
    // delete the product from the database
    // return a success message in the response

    try {
        const productId = req.params.productId;

        if (!productId) {
            throw new ApiError(400, "productId is required in the request params!!!");
        }

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            throw new ApiError(404, "Product not found!!!");
        }

        return res.status(200).json(new ApiResponse(200, product, "Product deleted successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to delete product!!!");
    }
})

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductDetailsById,
    updateProductImageById,
    deleteProductById
}