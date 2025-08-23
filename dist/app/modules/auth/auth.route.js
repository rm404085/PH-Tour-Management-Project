"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const checkauth_1 = require("../../middleware/checkauth");
const user_interfaces_1 = require("../user/user.interfaces");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.AuthController.credentialsLogin);
router.post("/refresh-token", auth_controller_1.AuthController.getNewAccessToken);
router.post("/logout", auth_controller_1.AuthController.logout);
router.post("/reset-password", (0, checkauth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), auth_controller_1.AuthController.resetPassword);
//  /booking -> /login -> succesful google login -> /booking frontend
// /login -> succesful google login -> / frontend
router.get("/google", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const redirect = req.query.redirect || "/";
    passport_1.default.authenticate("google", { scope: ["profile", "email"], state: redirect })(req, res, next);
}));
// api/v1/auth/google/callback?state=/booking
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), auth_controller_1.AuthController.googleCallbackController);
exports.AuthRoute = router;
