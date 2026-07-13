import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { categoryController } from "./categories.controller";

const router = Router()

// router.post("/categories",auth(UserRole.ADMIN),categoryController.createCategory)
router.get("/",categoryController.getAllCategory)

export const categoriesRouter = router