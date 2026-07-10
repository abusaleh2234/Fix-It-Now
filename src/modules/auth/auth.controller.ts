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

const loginUser = catchAsync( async (req: Request, res: Response,next: NextFunction) => {
    const payload =req.body

    const {accessToken, refreshToken} = await authServices.loginUser(payload)
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000  * 60 * 60 * 24
    })
    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000  * 60 * 60 * 24 * 7
    })
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User Login successfully",
        data: {accessToken, refreshToken}
    })
})

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const profile =await authServices.getMyProfile(req.user?.id as string)

    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Profile Fetch successfully",
        data: profile
    })
})
const refreshToken = catchAsync(async (req:Request,res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken

    const {accessToken} = await authServices.refreshToken(refreshToken)
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000  * 60 * 60 * 24
    })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token Refreshed Successfully",
        data: {
            accessToken
        }
    })
})
export const authController = {
    userRegister,
    loginUser,
    getMyProfile,
    refreshToken
}