import { NextFunction, Request, Response } from "express";


import httpStatus from "http-status-codes";
import { userServises } from "./user.services";
import { Error } from "mongoose";

import { catchAsync } from "../../utils/catcjAsync";
import { sendResponse } from "../../utils/sendResponse";


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


    //  res.status(httpStatus.CREATED).json({
    //          message: "User created Successfully",
    //         user
    //     })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Creayed Successfully",
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
    getAllUsers
}

// route maching -> controller -> services -> model -> db