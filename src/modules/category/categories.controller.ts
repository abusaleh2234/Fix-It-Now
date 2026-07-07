import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { categoryServices } from "./categories.services";

const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const ctgPayload = req.body

    const category  = await categoryServices.createCategory(ctgPayload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category Created Successfully",
        data: category
    })
})
const getAllCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryServices.getAllCategory()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All categories retrerive successfully.",
        data: categories
    })
})

export const categoryController = {
    createCategory,
    getAllCategory
}