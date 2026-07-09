import { prisma } from "../../../lib/prisma"

const createAvailability = async (userId: string, payload: { day: string, startTime: string, endTime: string }) => {
    const availability = await prisma.availability.create({
        data: {
            technicianId: userId,
            day: payload.day,
            startTime: payload.startTime,
            endTime: payload.endTime
        }
    })
    return availability
}

export const availabilityServices = {
    createAvailability
}