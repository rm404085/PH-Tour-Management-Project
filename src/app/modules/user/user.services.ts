import AppError from "../../errorHelpUs/appError";
import { IAuthProvider,  IUser, Role } from "./user.interfaces";
import { User } from "./user.model";
import httpstatus from "http-status-codes"
import bycriptjs from "bcryptjs"

import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
const createUserService = async (payload: Partial<IUser>) =>{

    const { email, password, ...rest} =payload;

    const isUserExist = await User.findOne({email})
    const hashedPassword = await bycriptjs.hash(password as string , Number(envVars.BCRYPT_SALT_ROUND))
    if(isUserExist){
        throw new AppError(httpstatus.CREATED, "User already exist")
    }

    const authProvider : IAuthProvider = {provider:"credential", providerId:email as string}

        const user = await User.create({
            
            email,
            password: hashedPassword,
            auth : [authProvider],
            ...rest
        })
        return user;
}

const updateUser = async (userId: string, payload : Partial<IUser>, decodedToken: JwtPayload) => {


const ifUserExist = await User.findById(userId);

if(!ifUserExist){
    throw new AppError(httpstatus.NOT_FOUND, "User not found")
}

// if(ifUserExist.isDeleted || ifUserExist.isActive === IsActive.BLOCKED){
//     throw new AppError(httpstatus.FORBIDDEN, "This user cannot be update")
// }

if(payload.role){
    if(decodedToken.role === Role.USER || decodedToken.role ===Role.GUIDE){
        throw new AppError(httpstatus.FORBIDDEN, "you are not authorized");
    }

    if(payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN)
        {
        throw new AppError(httpstatus.FORBIDDEN, "you are not authorized")
    }
}
if(payload.isActive || payload.isDeleted || payload.isVerified){
    if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
         throw new AppError(httpstatus.FORBIDDEN, "you are not authorized")
    }
}

if(payload.password){
    payload.password = await bycriptjs .hash(payload.password, envVars.BCRYPT_SALT_ROUND)
}


const newUpdateUser = await User.findByIdAndUpdate(userId,payload, { new: true, runValidators: true})

return newUpdateUser



}

const getAllUsers = async ()=>{
           
    const users = await User.find({})
    const totalUsers = await User.countDocuments();

    return {
        data:users,
        meta: {
            total: totalUsers
        }

    };
}


export const userServises = {
    createUserService,
    getAllUsers,
    updateUser
}