import { TechnicianProfileWhereInput } from "../../../generated/prisma/models"
import { prisma } from "../../lib/prisma"
import { ITechnicianProfile, ITechnicianQuery } from "./technician.interface"

const technicianCreate = async (payload: ITechnicianProfile, userId: string) => {
    const { bio,  location, experience, hourlyRate } = payload

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
    console.log(location);
    
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
                        location,
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
const getTechnicians = async (query: ITechnicianQuery) => {
    const queryValue = query.isAvailable !== undefined ? true : query.isAvailable
    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc"

    const andCondition: TechnicianProfileWhereInput[] = []

    if (query.search) {
        andCondition.push(
            {
                OR: [
                    {
                        user: {
                            name: {
                                contains: query.search,
                                mode: "insensitive"
                            }
                        }
                    },
                    {
                        bio: {
                            contains: query.search,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        )
    }
    if (query.isAvailable) {
        andCondition.push({
            isAvailable: queryValue
        })
    }
    if (query.name) {
        andCondition.push({
            user: {
                name: query.name
            }
        })
    }
    if (query.location) {
        andCondition.push({
            location: query.location
        })
    }
    const technicians = await prisma.technicianProfile.findMany({
        where:{
            AND: andCondition
        },
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            user: {
                omit: {
                    password: true
                },
                include:{
                    customerReviews: true
                }
            },
        }
    })
    return technicians
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
                },
                include:{
                    customerReviews: true
                }
            },
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
    updateBookingStatus,
    getTechnicians
}