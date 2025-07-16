import { NextFunction, Request, Response } from "express"

export  const validationRequest = (zodSchema:AnyZodObject) => async(req:Request, res:Response, next: NextFunction)=>{

    try {
       
        req.body = await zodSchema.parseAsync(req.body)
         
    next()
        
    } catch (err) {
        next(err)
    }

    


}
