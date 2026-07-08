export interface IBookingPayload {
    // technicianId: string
    serviceId: string
    bookingDate: Date
    address: string
    note?: string
    totalAmount: number
}