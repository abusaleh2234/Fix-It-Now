import config from "../../config"
import { prisma } from "../../lib/prisma"
import bcrypt from "bcrypt"
import { UserRegisterPayload } from "./auth.interface"
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

export const  authServices = {
    userRegisterIntoDb
}