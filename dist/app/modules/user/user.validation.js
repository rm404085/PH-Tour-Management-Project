"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default.string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name must be at keast 2 character" })
        .max(50, { message: "Name cannot exces 50 character" }),
    email: zod_1.default.string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid email address format" })
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(100, { message: "Email cannot exceesd 100 character" }),
    password: zod_1.default.string({ invalid_type_error: "Password must be string" }).min(8, { message: "Password must be at least 8 character" }).regex(/.*[A-Z].*/, { message: "Password must contain at least 1 uppercase letter" })
        .regex(/.*[^a-zA-Z0-9].*/, { message: "Password must contain at least 1 special character " }).regex(/.*[0-9].*/, { message: "password must be contait 1 number " }),
    phone: zod_1.default.string({ invalid_type_error: "Phone number must be string" }).regex(/^(?:\+8801|8801|01)[3-9][0-9]{8}$/, { message: " phone number valid for banglades . Format:+8801XXXXXXXXX " })
        .optional(),
    address: zod_1.default.string({ invalid_type_error: "Address must be string" })
        .max(200, { message: "Address cannot exeed 200 characters" })
        .optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default.string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name must be at keast 2 character" })
        .max(50, { message: "Name cannot exces 50 character" }).optional(),
    password: zod_1.default.string({ invalid_type_error: "Password must be string" }).min(8, { message: "Password must be at least 8 character" }).regex(/.*[A-Z].*/, { message: "Password must contain at least 1 uppercase letter" })
        .regex(/.*[^a-zA-Z0-9].*/, { message: "Password must contain at least 1 special character " }).regex(/.*[0-9].*/, { message: "password must be contait 1 number " }),
    phone: zod_1.default.string({ invalid_type_error: "Phone number must be string" }).regex(/^(?:\+8801|8801|01)[3-9][0-9]{8}$/, { message: " phone number valid for banglades . Format:+8801XXXXXXXXX " })
        .optional(),
    address: zod_1.default.string({ invalid_type_error: "Address must be string" })
        .max(200, { message: "Address cannot exeed 200 characters" })
        .optional(),
});
