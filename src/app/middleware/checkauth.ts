import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpUs/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes"
import { IsActive } from "../modules/user/user.interfaces";


export const checkAuth = (...authRoles: string[]) =>async(req:Request, res:Response, next: NextFunction)=>{
    try {
        console.log(...authRoles);
    const accessToken = req.headers.authorization;


    if(!accessToken){
        throw new AppError(403, "access token error")
    }
    
    


const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
// authRole = ["ADMIN", "SUPER_ADMIN"].includes("ADMIN")

 const isUserExist = await User.findOne({
        email: verifiedToken.email })

     if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "user does Not Exit")
    }
    if(isUserExist.isActive===IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE){
        throw new AppError(httpStatus.BAD_REQUEST, `user does ${isUserExist.isActive}`);
    }
 if(isUserExist.isDeleted){
        throw new AppError(httpStatus.BAD_REQUEST, "user does deleted")
    }

console.log(verifiedToken);
    if(!authRoles.includes(verifiedToken.role)){
        throw new AppError(403, "you are not permitted view this route")
    }
    
    req.user = verifiedToken;
    // console.log(verifyToken);
    next()


    } catch (error) {
        
        next(error);
    }

}