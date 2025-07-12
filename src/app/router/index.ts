import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";



export const router = Router();

const moduleRouter = [

    {
        path:"/user",
        route: UserRouter
    }
]

moduleRouter.forEach((route)=>{

    router.use(route.path, route.route)

})