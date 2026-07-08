import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { bookingController } from "../booking/booking.controller";

const router = Router()

router.get("/bookings",
    auth(UserRole.ADMIN,UserRole.TECHNICIAN),
    bookingController.getTechnicianBooking
)
router.get("/:id",technicianController.getTechnicianById)

router.put("/profile",auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.TECHNICIAN),
    technicianController.technicianCreate)
export const technicianRouter = router