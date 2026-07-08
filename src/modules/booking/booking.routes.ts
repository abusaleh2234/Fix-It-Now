import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()
router.post("/",auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.TECHNICIAN),bookingController.customerBookingCreate)
export const bookingRouter = router