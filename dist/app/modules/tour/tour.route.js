"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourRoutes = void 0;
const express_1 = __importDefault(require("express"));
const tour_controller_1 = require("./tour.controller");
const checkauth_1 = require("../../middleware/checkauth");
const user_interfaces_1 = require("../user/user.interfaces");
const tour_validation_1 = require("./tour.validation");
const validationRequest_1 = require("../../globalError/validationRequest");
const router = express_1.default.Router();
/* ------------------ TOUR TYPE ROUTES -------------------- */
// router.get("/tour-types", TourController.getAllTourTypes);
router.post("/create-tour-type", (0, checkauth_1.checkAuth)(user_interfaces_1.Role.ADMIN, user_interfaces_1.Role.SUPER_ADMIN), (0, validationRequest_1.validationRequest)(tour_validation_1.createTourTypeZodSchema), tour_controller_1.TourController.createTourType);
router.patch("/tour-types/:id", (0, checkauth_1.checkAuth)(user_interfaces_1.Role.ADMIN, user_interfaces_1.Role.SUPER_ADMIN), (0, validationRequest_1.validationRequest)(tour_validation_1.createTourTypeZodSchema), tour_controller_1.TourController.updateTourType);
router.delete("/tour-types/:id", (0, checkauth_1.checkAuth)(user_interfaces_1.Role.ADMIN, user_interfaces_1.Role.SUPER_ADMIN), tour_controller_1.TourController.deleteTourType);
/* --------------------- TOUR ROUTES ---------------------- */
// router.get("/", TourController.getAllTours);
router.post("/create", (0, checkauth_1.checkAuth)(user_interfaces_1.Role.ADMIN, user_interfaces_1.Role.SUPER_ADMIN), (0, validationRequest_1.validationRequest)(tour_validation_1.createTourZodSchema), tour_controller_1.TourController.createTour);
router.patch("/:id", (0, checkauth_1.checkAuth)(user_interfaces_1.Role.ADMIN, user_interfaces_1.Role.SUPER_ADMIN), (0, validationRequest_1.validationRequest)(tour_validation_1.updateTourZodSchema), tour_controller_1.TourController.updateTour);
router.delete("/:id", (0, checkauth_1.checkAuth)(user_interfaces_1.Role.ADMIN, user_interfaces_1.Role.SUPER_ADMIN), tour_controller_1.TourController.deleteTour);
exports.TourRoutes = router;
