import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { bookingController } from "../booking/booking.controller";
import { availabilityController } from "./availability/availability.controller";

const router = Router()

router.post("/availability",auth(UserRole.ADMIN,UserRole.TECHNICIAN),availabilityController.createAvailability)
router.get("/availability",auth(UserRole.ADMIN,UserRole.TECHNICIAN),availabilityController.getAvailability)
router.put("/availability/:id",auth(UserRole.ADMIN,UserRole.TECHNICIAN),availabilityController.updateAvailability)
router.delete("/availability/:id",auth(UserRole.ADMIN,UserRole.TECHNICIAN),availabilityController.deleteAvailability)
router.get("/bookings",
    auth(UserRole.ADMIN,UserRole.TECHNICIAN),
    bookingController.getTechnicianBooking
)
router.get("/",technicianController.getTechnicians)
router.get("/:id",technicianController.getTechnicianById)
router.put("/profile",auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.TECHNICIAN),
    technicianController.technicianCreate)
router.patch("/bookings/:id",auth(UserRole.TECHNICIAN),technicianController.updateBookingStatus)
export const technicianRouter = router