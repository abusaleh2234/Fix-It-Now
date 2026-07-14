import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { categoryController } from "../category/categories.controller";
import { adminController } from "./admin.controller";

const router = Router()

router.post("/categories",auth(UserRole.ADMIN),categoryController.createCategory)
router.get("/categories",auth(UserRole.ADMIN),categoryController.getAllCategory)
router.get("/users", auth(UserRole.ADMIN), adminController.geAllUser)
router.patch("/users/:id", auth(UserRole.ADMIN),adminController.userBlocked)
router.patch("/users-unblock/:id", auth(UserRole.ADMIN),adminController.userUnBlocked)
export const adminRouter = router