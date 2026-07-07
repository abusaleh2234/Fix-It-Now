import { prisma } from "../../lib/prisma";
import { IServicesPayload } from "./services.interface";

const createServices = async (payload: IServicesPayload, userId: string) => {
    const { categoryId, title, description, price, duration } = payload
    const technician = await prisma.technicianProfile.findUnique({
        where: {
            userId
        }
    })

    if (!technician) {
        throw new Error("You are not Technician,Create account as a Technician")
    }

    const isExistCategory = await prisma.category.findUnique({
        where: {
            id: categoryId,
        }
    })

    if (!isExistCategory) {
        throw new Error("This Category is not exist")
    }

    const services = await prisma.service.create({
        data: {
            technicianId: userId,
            categoryId,
            title,
            description,
            price,
            duration
        }
    })
    return services
}

export const Technician_serviceServices = {
    createServices
}