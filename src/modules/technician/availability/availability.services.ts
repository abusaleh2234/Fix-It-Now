import { prisma } from "../../../lib/prisma"

const createAvailability = async (userId: string, payload: { day: string, startTime: string, endTime: string }) => {
    
    const technician = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include:{
            technicianProfile: true
        }
    })
    // console.log(technician);
    
    if (!technician) {
        throw new Error("Technician is not available")
    }
    const availability = await prisma.availability.create({
        data: {
            technicianId: technician.technicianProfile?.id as string,
            day: payload.day,
            startTime: payload.startTime,
            endTime: payload.endTime
        }
    })
    return availability
}
const getAvailability = async (userId: string) => {
    
    const technician = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include:{
            technicianProfile: true
        }
    })
    // console.log(technician);
    
    if (!technician) {
        throw new Error("You are not Technician")
    }
    const availability = await prisma.availability.findMany({
        where: {
            technicianId: technician.technicianProfile?.id
        }
    })
    return availability
}

export const availabilityServices = {
    createAvailability,
    getAvailability
}