import { NextFunction, Request, Response } from "express";


import httpStatus from "http-status-codes";
import { userServises } from "./user.services";


import { catchAsync } from "../../utils/catcjAsync";
import { sendResponse } from "../../utils/sendResponse";

import { JwtPayload } from "jsonwebtoken";


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
const createUser = catchAsync(async(req : Request, res : Response, next:NextFunction) =>{
    const user = await userServises.createUserService(req.body);


    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Creayed Successfully",
        data: user,
    })
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = catchAsync(async(req : Request, res : Response, next:NextFunction) =>{
     
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await userServises.updateUser(userId, payload, verifiedToken as JwtPayload);


    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data: user,
    })
})

 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const getAllUsers = catchAsync(async (req : Request, res : Response, next:NextFunction)=>{
        

        const result = await userServises.getAllUsers();

        // res.status(httpStatus.OK).json({
        //     success: true,
        //     message: "All Uers Read Write Successfully",
        //     users
        // })

        sendResponse(res, {
           success: true,
        statusCode: httpStatus.OK,
        message: "All Users Retrieved Successfully",
        data: result,
        meta: result.meta
        })
    
    
 }) 

export const  UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}

// route maching -> controller -> services -> model -> db