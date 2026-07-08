import { prisma } from "../../lib/prisma";
import { IBookingPayload } from "./booking.interface"

const customerBookingCreate =async (payload: IBookingPayload, userId: string) => {
    const {serviceId, bookingDate, address, note, totalAmount} = payload 
    // console.log(payload);
    const customer = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!customer) {
        throw new Error("You are not login, Please login")
    }
    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        },
        include: {
            technician: true
        }
    })
    if (!service) {
        throw new Error("This services is not available")
    }
    // const 
    // console.log(service.technician.id);
    const technician = await prisma.technicianProfile.findUnique({
        where: {
            id: service.technicianId
        }
    })
    if (!technician) {
        throw new Error("Technician is not available")
    }
    // console.log(technician, "tech");
    
    const booking = await prisma.booking.create({
        data:{
            customerId:customer.id,
            serviceId: service.id,
            technicianId: technician.userId,
            bookingDate: bookingDate,
            address,
            note,
            totalAmount
        }
    })
    return booking
}

export const bookingServices = {
    customerBookingCreate
}