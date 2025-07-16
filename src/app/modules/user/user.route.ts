import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";

import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validationRequest } from "../../globalError/validationRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpUs/appError";
import { Role } from "./user.interfaces";
import { envVars } from "../../config/env";
import { verifyToken } from "../../utils/jwt";
import { checkAuth } from "../../middleware/checkauth";

const router = Router();


router.post("/register",
    validationRequest(createUserZodSchema)
     ,UserControllers.createUser)
router.get("/all-users",checkAuth(Role.USER,Role.ADMIN,Role.SUPER_ADMIN), UserControllers.getAllUsers)
router.patch("/:id",validationRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser)
// /api/vi/user/:id

export const UserRouter = router;