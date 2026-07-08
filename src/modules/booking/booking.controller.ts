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
const getCustomerBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id

    const bookings = await bookingServices.getCustomerBooking(userId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your Booking is retrieved successfully",
        data: bookings
    })
})
const getTechnicianBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    console.log(userId);
    
    const bookings = await bookingServices.getCustomerBooking(userId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your Bookings is retrieved successfully",
        data: bookings
    })
})
const getBookingByID = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id

    const booking = await bookingServices.getBookingByID(bookingId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking retrieved successfully",
        data: booking
    })
})
export const bookingController = {
    customerBookingCreate,
    getCustomerBooking,
    getBookingByID,
    getTechnicianBooking
}