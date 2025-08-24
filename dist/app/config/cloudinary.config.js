"use strict";
// Frontedn -> Form Data with Image File -> Multer -> Form data -> Req (Body + File)
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("./env");
// Amader folder -> image -> form data -> File -> Multer -> Amader project / pc te Nijer ekta folder(temporary) -> Req.file
//req.file -> cloudinary(req.file) -> url -> mongoose -> mongodb
cloudinary_1.v2.config({
    cloud_name: env_1.envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.envVars.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: env_1.envVars.CLOUDINARY.CLOUDINARY_API_SECRET
});
exports.cloudinaryUpload = cloudinary_1.v2;
