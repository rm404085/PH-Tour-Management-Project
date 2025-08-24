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
exports.AuthController = void 0;
const catcjAsync_1 = require("../../utils/catcjAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_services_1 = require("./auth.services");
const appError_1 = __importDefault(require("../../errorHelpUs/appError"));
const setCookies_1 = require("../../utils/setCookies");
const refreshaccess_1 = require("../../utils/refreshaccess");
const env_1 = require("../../config/env");
const passport_1 = __importDefault(require("passport"));
const credentialsLogin = (0, catcjAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await userServises.createUserService(req.body);
    //   const loginInfo = await AuthService.credentialsLogin(req.body);
    passport_1.default.authenticate("local", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return new appError_1.default(401, err);
        }
        if (!user) {
            return new appError_1.default(401, info.message);
        }
        const userTokens = yield (0, refreshaccess_1.createUserToken)(user);
        const _a = user.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
        (0, setCookies_1.setAuthCookies)(res, userTokens);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "User Login  Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest
            },
        });
    }))(req, res, next);
    //  res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false,
    //  })
    //   res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false
    //   })
}));
const getNewAccessToken = (0, catcjAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await userServises.createUserService(req.body);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "refresh token error from cookeis");
    }
    const tokenInfo = yield auth_services_1.AuthService.getNewAccessToken(refreshToken);
    const tokens = {
        accessToken: tokenInfo.accessToken.accessToken, // access the string inside the object
    };
    (0, setCookies_1.setAuthCookies)(res, tokens);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "access token   Successfully",
        data: tokenInfo,
    });
}));
const logout = (0, catcjAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User Logout  Successfully",
        data: null
    });
}));
const resetPassword = (0, catcjAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;
    yield auth_services_1.AuthService.resetPassword(oldPassword, newPassword, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Password Change  Successfully",
        data: null
    });
}));
const googleCallbackController = (0, catcjAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let redirectTo = req.query.state ? req.query.state : "";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }
    const user = req.user;
    if (!user) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "user not found ");
    }
    const tokenInfo = yield (0, refreshaccess_1.createUserToken)(user);
    (0, setCookies_1.setAuthCookies)(res, tokenInfo);
    //   sendResponse(res, {
    //         success: true,
    //         statusCode: httpStatus.OK,
    //         message: "Password Change  Successfully",
    //         data: null
    //     })
    res.redirect(`${env_1.envVars.FRONTEND_URL}/${redirectTo}`);
}));
exports.AuthController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
};
