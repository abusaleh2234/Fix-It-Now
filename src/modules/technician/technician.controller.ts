import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { technicianServices } from "./tichnician.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const technicianCreate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userid = req.user?.id
    const payload = req.body
    console.log(payload);
    
    const result = await technicianServices.technicianCreate(payload,userid as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Technician Profile Create Successfully",
        data: result
    })
})
const getTechnicianById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const technicianId = req.params.id

    const result = await technicianServices.getTechnicianById(technicianId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Technician Profile retrieved Successfully",
        data: result
    })
})

const updateBookingStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id
    const technicianId = req.user?.id
    const payload = req.body

    // console.log(bookingId,technicianId,payload);
    const result = await technicianServices.updateBookingStatus(payload, bookingId as string, technicianId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `booking status ${result.status} is updated`,
        data: result
    })
})


export const technicianController = {
    technicianCreate,
    getTechnicianById,
    updateBookingStatus
}