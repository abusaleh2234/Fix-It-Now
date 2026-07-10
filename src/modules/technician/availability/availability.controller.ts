import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status"
import { availabilityServices } from "./availability.services";

const createAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction)  => {
    const userId = req.user?.id
    const payload = req.body
    const availability = await availabilityServices.createAvailability(userId as string,payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Technician availability create successfully.",
        data: availability
    })
})
const getAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction)  => {
    const userId = req.user?.id
    const result = await availabilityServices.getAvailability(userId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician availability create successfully.",
        data: result
    })
})
const updateAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction)  => {
    const availabilityID = req.params.id
    const userId = req.user?.id
    const payload = req.body
    const result = await availabilityServices.updateAvailability(userId as string, availabilityID as string, payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician availability create successfully.",
        data: result
    })
})
const deleteAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction)  => {
    const availabilityID = req.params.id
    const userId = req.user?.id
    const result = await availabilityServices.deleteAvailability(userId as string, availabilityID as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician availability create successfully.",
        data: result
    })
})

export const availabilityController ={ 
    createAvailability,
    getAvailability,
    updateAvailability,
    deleteAvailability
}