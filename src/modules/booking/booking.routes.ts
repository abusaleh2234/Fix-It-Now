import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()
router.post("/",auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.TECHNICIAN),bookingController.customerBookingCreate)
router.get("/",auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.TECHNICIAN),bookingController.getCustomerBooking)
router.get("/:id",auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.TECHNICIAN),bookingController.getBookingByID)
export const bookingRouter = router