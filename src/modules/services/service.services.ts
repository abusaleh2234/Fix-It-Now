import { prisma } from "../../lib/prisma";
import { IServicesPayload } from "./services.interface";

const createServices = async (payload: IServicesPayload, userId: string) => {
    const { categoryId, title, description, price} = payload
    const technician = await prisma.technicianProfile.findUnique({
        where: {
            userId
        }
    })

    if (!technician) {
        throw new Error("You are not Technician,Create account as a Technician")
    }

    const isExistCategory = await prisma.category.findUniqueOrThrow({
        where: {
            id: categoryId,
        }
    })
    console.log(isExistCategory);
    
    if (!isExistCategory) {
        throw new Error("This Category is not exist")
    }

    const services = await prisma.service.create({
        data: {
            technicianId: technician.id,
            categoryId: isExistCategory.id,
            title,
            description,
            price
        },
        include: {
            technician: {
                include: {
                    user: true
                }
            },
            
        }
    })
    return services
}

export const Technician_serviceServices = {
    createServices
}