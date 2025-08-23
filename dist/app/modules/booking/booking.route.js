"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkauth_1 = require("../../middleware/checkauth");
const user_interfaces_1 = require("../user/user.interfaces");
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const validationRequest_1 = require("../../globalError/validationRequest");
const router = express_1.default.Router();
// api/v1/booking
router.post("/", (0, checkauth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), (0, validationRequest_1.validationRequest)(booking_validation_1.createBookingZodSchema), booking_controller_1.BookingController.createBooking);
// api/v1/booking
router.get("/", (0, checkauth_1.checkAuth)(user_interfaces_1.Role.ADMIN, user_interfaces_1.Role.SUPER_ADMIN), booking_controller_1.BookingController.getAllBookings);
// api/v1/booking/my-bookings
router.get("/my-bookings", (0, checkauth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), booking_controller_1.BookingController.getUserBookings);
// api/v1/booking/bookingId
router.get("/:bookingId", (0, checkauth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), booking_controller_1.BookingController.getSingleBooking);
// api/v1/booking/bookingId/status
router.patch("/:bookingId/status", (0, checkauth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), (0, validationRequest_1.validationRequest)(booking_validation_1.updateBookingStatusZodSchema), booking_controller_1.BookingController.updateBookingStatus);
exports.BookingRoutes = router;
