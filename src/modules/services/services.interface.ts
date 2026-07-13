export interface IServicesPayload {
    categoryId: string,
    title: string,
    description: string,
    price: number,
    duration: number
}

export interface IServicesQuery {
    title?: string
    type?: string
    rating?: number
    location?:string
    search?: string
    page?: string
    limit?: string
    sortOrder?: string
    sortBy?: string
}