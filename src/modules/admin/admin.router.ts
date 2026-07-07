import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { categoryController } from "../category/categories.controller";

const router = Router()

router.post("/categories",auth(UserRole.ADMIN),categoryController.createCategory)
router.get("/categories",auth(UserRole.ADMIN),categoryController.getAllCategory)

export const adminRouter = router