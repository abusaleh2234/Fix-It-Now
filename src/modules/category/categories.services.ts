import { prisma } from "../../lib/prisma"

const createCategory = async (ctgPayload: {name: string, description: string}) => {
    const {name, description} = ctgPayload
    const category = await prisma.category.create({
        data: {
            name,
            description,
        }
    })
    return category
}

const getAllCategory =async () => {
    const categories = await prisma.category.findMany()

    return categories
}

export const categoryServices = {
    createCategory,
    getAllCategory
}