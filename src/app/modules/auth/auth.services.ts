/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../errorHelpUs/appError";
import { IsActive, IUser } from "../user/user.interfaces"
import jwt, { JwtPayload } from "jsonwebtoken"

import httpstatus  from 'http-status-codes';
import { User } from "../user/user.model";
import bcryptjs  from 'bcryptjs';
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { createNewAccessTokenAndRefreshToken, createUserToken } from "../../utils/refreshaccess";
const credentialsLogin = async (payload: partial<IUser>) =>{
            
    const {email,password} = payload;

     const isUserExist = await User.findOne({email})

     if(!isUserExist){
        throw new AppError(httpstatus.BAD_REQUEST, "Email does Not Exit")
    }
    const isPasswordWatched = await bcryptjs.compare(password as string,isUserExist.password as string )

    if(!isPasswordWatched){
        throw new AppError(httpstatus.BAD_REQUEST, "Incorrect password")
    }
       
    // const jwtPayload = {
    //     userId: isUserExist._id,
    //     email: isUserExist.email,
    //     role: isUserExist.role 
    // }
   
    //  const accessToken  = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
     
    //  const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    const userToken = createUserToken(isUserExist)

     const {password: pass , ...rest} = isUserExist.toObject()

    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user : rest
    }
}

const getNewAccessToken = async (refreshToken: string) =>{
            
const newAccessToke = await createNewAccessTokenAndRefreshToken(refreshToken);
    return {
        accessToken: newAccessToke,
        
    }
}

const resetPassword = async (oldPassword:string, newPassword: string, decodedToken: JwtPayload) =>{
        

    const user = await User.findById(decodedToken.userId)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const isoldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)

    console.log("Old Password:", oldPassword);
console.log("Hashed Password:", user!.password);
    if(!isoldPasswordMatch){
        throw new AppError(httpstatus.UNAUTHORIZED, "old password does not match")
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save()

  }

export const AuthService = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
}