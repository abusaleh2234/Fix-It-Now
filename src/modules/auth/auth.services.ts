import config from "../../config"
import { prisma } from "../../lib/prisma"
import bcrypt from "bcrypt"
import { ILoginUserPayload, UserRegisterPayload } from "./auth.interface"
import { jwtUtils } from "../../utils/jwt"
import { SignOptions } from "jsonwebtoken"


const userRegisterIntoDb = async (payload: UserRegisterPayload) => {

    const {name,email,password,profileImage} = payload
    const isUserExist = await prisma.user.findUnique({
        where: {email}
    })
    if(isUserExist){
        throw new Error("User with this email already exist")
    }

    const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
            profileImage
        }
    })
    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email
        },
        omit: {
            password: true
        }
    })

    return user
}
const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        throw new Error("Incorrect user password")
    }

    const jwtUserPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtUtils.createToken(jwtUserPayload,config.jwt_access_secret, config.jwt_access_expires_in as SignOptions)

    const refreshToken = jwtUtils.createToken(jwtUserPayload,config.jwt_refresh_secret,config.jwt_refresh_expires_in as SignOptions )

    return {accessToken, refreshToken}
}

const getMyProfile = async (userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {id: userId},
        omit: {password: true}
    })
    return user
}
export const  authServices = {
    userRegisterIntoDb,
    loginUser,
    getMyProfile
}