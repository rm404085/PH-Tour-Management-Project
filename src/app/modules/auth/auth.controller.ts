import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catcjAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus  from 'http-status-codes';
import { AuthService } from "./auth.services";
import AppError from "../../errorHelpUs/appError";
import { setAuthCookies } from "../../utils/setCookies";
import { createUserToken } from "../../utils/refreshaccess";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async(req : Request, res : Response, next:NextFunction) =>{
    // const user = await userServises.createUserService(req.body);
  const loginInfo = await AuthService.credentialsLogin(req.body);

//  res.cookie("accessToken", loginInfo.accessToken, {
//     httpOnly: true,
//     secure: false,
//  })
setAuthCookies(res, loginInfo)

//   res.cookie("refreshToken", loginInfo.refreshToken, {
//     httpOnly: true,
//     secure: false
//   })


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Login  Successfully",
        data: loginInfo,
    })
})
const getNewAccessToken = catchAsync(async(req : Request, res : Response, next:NextFunction) =>{
    // const user = await userServises.createUserService(req.body);
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST, "refresh token error from cookeis")
    }
  const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string);
    
  setAuthCookies(res, tokenInfo);

  sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "access token   Successfully",
        data: tokenInfo,
    })
})

const logout = catchAsync(async(req : Request, res : Response, next:NextFunction) =>{
   
    res.clearCookie("accessToken", {

        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })

  sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logout  Successfully",
        data: null
    })
})

const resetPassword = catchAsync(async(req : Request, res : Response, next:NextFunction) =>{
   
const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      
      const decodedToken = req.user;

      await AuthService.resetPassword( oldPassword,newPassword, decodedToken as JwtPayload)

  sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Change  Successfully",
        data: null
    })
})


const googleCallbackController = catchAsync(async(req : Request, res : Response, next:NextFunction) =>{
   
    let redirectTo = req.query.state ? req.query.state as string : ""

    if(redirectTo.startsWith("/")){
        redirectTo = redirectTo.slice(1);
    }
      const user = req.user

      if(!user){
        throw new AppError(httpStatus.BAD_REQUEST, "user not found ")
      }

      const tokenInfo = createUserToken(user)

      setAuthCookies(res, tokenInfo)
  
//   sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.OK,
//         message: "Password Change  Successfully",
//         data: null
//     })

res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)

})
export const AuthController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
}