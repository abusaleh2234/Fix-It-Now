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
const getTechnicianById = async (technicianId: string) => {
    const technician = await prisma.technicianProfile.findUnique({
        where: {
            id: technicianId
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    })
    return technician
}
const updateBookingStatus = async (payload: {status: "ACCEPTED" | "DECLINED" | "COMPLETED"}, bookingId: string, technicianId: string) => {
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    if (booking.technicianId !== technicianId) {
        throw new Error("Unauthorized");
    }
    if (
        booking.status === "DECLINED" ||
        booking.status === "COMPLETED"
    ) {
        throw new Error("Booking status cannot be updated");
    }
    // console.log(booking.status, payload.status);
    
    const updatedBooking = await prisma.booking.update({
        where: {
            id: bookingId,
        },
        data: {
            status: payload.status,
        },
    });

    return updatedBooking;
}
export const technicianServices = {
    technicianCreate,
    getTechnicianById,
    updateBookingStatus
}