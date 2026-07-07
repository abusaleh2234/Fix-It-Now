import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { servicesController } from "./service.controller";

const router = Router()

router.post("/",auth(UserRole.TECHNICIAN),servicesController.createServices)
export const servicesRouter = router