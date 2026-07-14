export interface IBookingPayload {
    // technicianId: string
    serviceId: string
    bookingDate: string
    address: string
    note?: string
    totalAmount: number
}