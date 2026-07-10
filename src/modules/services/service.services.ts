import { ServiceWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IServicesPayload, IServicesQuery } from "./services.interface";

const createServices = async (payload: IServicesPayload, userId: string) => {
    const { categoryId, title, description, price,location } = payload
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
            price,
            location
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
const getAllServices = async (query: IServicesQuery) => {
    // const type = query.type ? query.type : ""
    const getCondition: ServiceWhereInput[] = []

    if (query.search) {
        getCondition.push(
            {
                OR: [
                    {
                        title: {
                            contains: query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: query.search,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        )
    }
    if(query.title) {
        getCondition.push({
            title : query.title        
        })
    }
    if(query.type) {
        getCondition.push({
            category:{
                name: query.type,
            }
        })
    }
    if (query.location) {
        getCondition.push({
            location: query.location
        })
    }
    // if(query.rating) {
    //     getCondition.push({
    //         rating: query.rating
    //     })
    // }
    const service = await prisma.service.findMany({
        where: {
            AND: getCondition
        },
        orderBy: {
            rating: "desc"
        },
        include: {
            technician: true
        }

    })
    return service
}
export const Technician_serviceServices = {
    createServices,
    getAllServices
}