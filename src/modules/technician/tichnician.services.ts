import { prisma } from "../../lib/prisma"
import { ITechnicianProfile } from "./technician.interface"

const technicianCreate = async (payload: ITechnicianProfile, userId: string) => {
    const { bio, experience, hourlyRate } = payload

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!user) {
        throw new Error("You are not user please Register")
    }
    // console.log(user);
    const isExistTechnician = await prisma.technicianProfile.findUnique({
        where: {
            userId: user?.id
        }
    })

    if (!isExistTechnician) {        
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                role: "TECHNICIAN",
                technicianProfile: {
                    create: {
                        bio,
                        experience,
                        hourlyRate
                    }
                }
            }
        })
    }


    const technicianProfile = await prisma.user.findUnique({
        where: {
            id: user.id,
            email: user.email
        },
        omit: {
            password: true
        },
        include: {
            technicianProfile: true
        }
    })
    return technicianProfile
}

export const technicianServices = {
    technicianCreate
}