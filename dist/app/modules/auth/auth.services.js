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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
const appError_1 = __importDefault(require("../../errorHelpUs/appError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const refreshaccess_1 = require("../../utils/refreshaccess");
const credentialsLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (!isUserExist) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Email does Not Exit");
    }
    const isPasswordWatched = yield bcryptjs_1.default.compare(password, isUserExist.password);
    if (!isPasswordWatched) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Incorrect password");
    }
    // const jwtPayload = {
    //     userId: isUserExist._id,
    //     email: isUserExist.email,
    //     role: isUserExist.role 
    // }
    //  const accessToken  = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
    //  const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)
    const userToken = (0, refreshaccess_1.createUserToken)(isUserExist);
    const _a = isUserExist.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest
    };
});
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccessToke = yield (0, refreshaccess_1.createNewAccessTokenAndRefreshToken)(refreshToken);
    return {
        accessToken: newAccessToke
    };
});
const resetPassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedToken.userId);
    const isoldPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    console.log("Old Password:", oldPassword);
    console.log("Hashed Password:", user.password);
    if (!isoldPasswordMatch) {
        throw new appError_1.default(http_status_codes_1.default.UNAUTHORIZED, "old password does not match");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    user.save();
});
exports.AuthService = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
};
