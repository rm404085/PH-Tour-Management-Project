import { Router } from "express";
import { checkAuth } from "../../middleware/checkauth";
import { Role } from "../user/user.interfaces";
import { createDivisionSchema, updateDivisionSchema } from "./validationSchema";
import { DivisionController } from "./division.controller";
import { validationRequest } from "../../globalError/validationRequest";
import { multerUpload } from "../../config/multer.config";



const router = Router()

router.post(
    "/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.single("file"),
    validationRequest(createDivisionSchema),
    DivisionController.createDivision
);
router.get("/", DivisionController.getAllDivisions);
router.get("/:slug", DivisionController.getSingleDivision)
router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validationRequest(updateDivisionSchema),
    DivisionController.updateDivision
);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DivisionController.deleteDivision);

export const DivisionRoutes = router