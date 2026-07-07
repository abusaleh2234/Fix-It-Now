import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { Technician_serviceServices } from "./service.services";

const createServices = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const userId = req.user?.id

    const service = await Technician_serviceServices.createServices(payload,userId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message :"Services Create Successfully",
        data: service

    })
})

export const servicesController = {
    createServices
}