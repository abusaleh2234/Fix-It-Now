import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { servicesController } from "./service.controller";

const router = Router()

router.post("/",auth(UserRole.TECHNICIAN,UserRole.ADMIN),servicesController.createServices)
router.get("/",servicesController.getAllServices)
export const servicesRouter = router