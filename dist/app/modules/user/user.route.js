"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validationRequest_1 = require("../../globalError/validationRequest");
const user_interfaces_1 = require("./user.interfaces");
const checkauth_1 = require("../../middleware/checkauth");
const router = (0, express_1.Router)();
router.post("/register", (0, validationRequest_1.validationRequest)(user_validation_1.createUserZodSchema), user_controller_1.UserControllers.createUser);
router.get("/all-users", (0, checkauth_1.checkAuth)(user_interfaces_1.Role.USER, user_interfaces_1.Role.ADMIN, user_interfaces_1.Role.SUPER_ADMIN), user_controller_1.UserControllers.getAllUsers);
router.patch("/:id", (0, validationRequest_1.validationRequest)(user_validation_1.updateUserZodSchema), (0, checkauth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), user_controller_1.UserControllers.updateUser);
// /api/vi/user/:id
exports.UserRouter = router;
