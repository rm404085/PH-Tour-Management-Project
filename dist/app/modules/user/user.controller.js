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
exports.UserControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_services_1 = require("./user.services");
const catcjAsync_1 = require("../../utils/catcjAsync");
const sendResponse_1 = require("../../utils/sendResponse");
// const createUser = async(req : Request, res : Response, next:NextFunction) =>{
//     try {
//         // throw new AppError(httpStatus.BAD_REQUEST, "Fake error")
//         const user = userServises.createUserService(req.body)
//         res.status(httpStatus.CREATED).json({
//             message: "User created Successfully",
//             user
//         })
//     }
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//  catch (err: any) {
//         console.log(err);
//         next(err)
//     }
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = (0, catcjAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_services_1.userServises.createUserService(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User Creayed Successfully",
        data: user,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = (0, catcjAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload
    const verifiedToken = req.user;
    const payload = req.body;
    const user = yield user_services_1.userServises.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User Updated Successfully",
        data: user,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = (0, catcjAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userServises.getAllUsers();
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Uers Read Write Successfully",
    //     users
    // })
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All Users Retrieved Successfully",
        data: result,
        meta: result.meta
    });
}));
exports.UserControllers = {
    createUser,
    getAllUsers,
    updateUser
};
// route maching -> controller -> services -> model -> db
