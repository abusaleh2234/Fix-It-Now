import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { bookingServices } from "./booking.services";
const customerBookingCreate = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const payload = req.body
    const booking = await bookingServices.customerBookingCreate(payload, userId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your Booking is complete",
        data: booking
    })
})

export const bookingController = {
    customerBookingCreate
}