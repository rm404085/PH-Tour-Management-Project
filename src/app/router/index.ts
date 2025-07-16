import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { AuthRoute } from "../modules/auth/auth.route";



export const router = Router();

const moduleRouter = [

    {
        path:"/user",
        route: UserRouter
    },
    {
        path: "/auth",
        route:AuthRoute
    }
]

moduleRouter.forEach((route)=>{

    router.use(route.path, route.route)

})