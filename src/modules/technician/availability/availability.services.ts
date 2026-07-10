import { prisma } from "../../../lib/prisma"
import { DayOfWeek } from "../technician.interface"

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
const updateAvailability = async (userId: string, availabilityID: string, payload: { day: string, startTime: string, endTime: string }) => {
    
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
    const availability = await prisma.availability.findUnique({
        where: {
            id: availabilityID
        }
    })
    if (!availability) {
        throw new Error("Availability not found")
    }
    const updatedAvailability = await prisma.availability.update({
        where: {
            id: availabilityID
        },
        data: {
            technicianId: technician.technicianProfile?.id as string,
            day: payload.day,
            startTime: payload.startTime,
            endTime: payload.endTime
        }
    })
    return updatedAvailability
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
const deleteAvailability = async (userId: string, availabilityID: string) => {
    
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
    const availability = await prisma.availability.findUnique({
        where: {
            id: availabilityID,
            technicianId: technician.technicianProfile?.id
        }
    })
    if (!availability) {
        throw new Error("It is not yourAvailability")
    }
    const deleteAvailability = await prisma.availability.delete({
        where: {
            id: availabilityID
        }
    })
    return deleteAvailability
}
export const availabilityServices = {
    createAvailability,
    getAvailability,
    updateAvailability,
    deleteAvailability
}