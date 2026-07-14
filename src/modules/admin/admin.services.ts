import { UserStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getAllUsers = async () => {

    const users = await prisma.user.findMany()
    return users
}
const userBlocked = async (userId: string) => {
    const blockedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            status: UserStatus.BLOCKED
        }
    })
    return blockedUser
}
const userUnBlocked = async (userId: string) => {
    const blockedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            status: UserStatus.ACTIVE
        }
    })
    return blockedUser
}
export const adminServices = {
    getAllUsers,
    userBlocked,
    userUnBlocked
}