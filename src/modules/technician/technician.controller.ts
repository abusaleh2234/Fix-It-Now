import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { technicianServices } from "./tichnician.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const technicianCreate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userid = req.user?.id
    const payload = req.body

    const result = await technicianServices.technicianCreate(payload,userid as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Technician Profile Create Successfully",
        data: result
    })
})

export const technicianController = {
    technicianCreate
}