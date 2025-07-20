import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { AuthRoute } from "../modules/auth/auth.route";
import {  DivisionRoutes } from "../modules/division/division.route";
import { TourRoutes } from "../modules/tour/tour.route";



export const router = Router();

const moduleRouter = [

    {
        path:"/user",
        route: UserRouter
    },
    {
        path: "/auth",
        route:AuthRoute
    },
    {
        path: "/division",
        route:DivisionRoutes
    },
    {
        path: "/tour",
        route: TourRoutes
    }
]

moduleRouter.forEach((route)=>{

    router.use(route.path, route.route)

})