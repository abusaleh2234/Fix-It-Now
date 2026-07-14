import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { adminServices } from "./admin.services";
const geAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result =await adminServices.getAllUsers()
    sendResponse(res, {
        success: true,
        statusCode : httpStatus.OK,
        message: "All user get successfully",
        data: result
    })
})
const userBlocked = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    const result = await adminServices.userBlocked(userId as string)
    sendResponse(res, {
        success: true,
        statusCode : httpStatus.OK,
        message: "User Blocked successfully",
        data: result
    })
})
const userUnBlocked = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    const result = await adminServices.userUnBlocked(userId as string)
    sendResponse(res, {
        success: true,
        statusCode : httpStatus.OK,
        message: "User Blocked successfully",
        data: result
    })
})
export const adminController = {
    geAllUser,
    userBlocked,
    userUnBlocked
}