import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/",auth(UserRole.TECHNICIAN),)
export const servicesRouter = router