import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.put("/profile",auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.TECHNICIAN),
    technicianController.technicianCreate)
router.get("/:id",technicianController.getTechnicianById)
export const technicianRouter = router