import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserRegisterPayload } from "./auth.interface";
import { authServices } from "./auth.services";
import httpStatus from "http-status"


const userRegister = catchAsync(async (req: Request,res: Response,next: NextFunction) => {
    const payload = req.body as UserRegisterPayload

        const user = await authServices.userRegisterIntoDb(payload);

        sendResponse(res,{
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User registered successfully",
            data: {user}
        })
})

export const authController = {
    userRegister
}