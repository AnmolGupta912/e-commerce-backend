import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Invoice} from "../models/invoice.model.js";
import { calculateOrderAmount } from "./payment.controller.js";
import {nanoid} from "nanoid";

const createInvoice = asyncHandler(async (req, res) => {
    
    const orderId = req.params.orderId;
    const order = await calculateOrderAmount(orderId);
    console.log("Order details for invoice creation:", order);


    const invoice = await Invoice.create({
        orderId,
        invoiceNumber: nanoid(), // Generate a unique invoice number
        amount:  order?.total || 0,
        taxAmount: order?.taxAmount || 0,
        issuedAt: new Date()
    });

    if (!invoice) {
        throw new ApiError(500, "Failed to create invoice!!!");
    }

    return res.status(201).json(new ApiResponse(201, invoice, "Invoice created successfully!!!"));
})

const getInvoiceByOrderId = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;

    const invoice = await Invoice.findOne({ orderId });

    if (!invoice) {
        throw new ApiError(404, "Invoice not found!!!");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, invoice, "Invoice found successfully!!!"));
})

const getInvoice = asyncHandler(async (req, res) => {
    const invoiceId = req.params.invoiceId;

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
        throw new ApiError(404, "Invoice not found!!!");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, invoice, "Invoice found successfully!!!"));
})

export { createInvoice, getInvoiceByOrderId, getInvoice };