/* eslint-disable @typescript-eslint/no-explicit-any */

import express, {  Request, Response } from "express"

import cors from "cors";
import { router } from "./app/router";
import { globalError } from "./app/globalError/globalError";
import httpStatus from 'http-status-codes';
import notFound from "./app/notFound/notFound";

const app = express();

app.use(express.json())

app.use(cors())

app.use("/api/v1", router);

app.get("/", (req : Request, res : Response)=>{
    res.status(200).json({
        message : "Welcome to server"
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(globalError)

app.use(notFound)

export default app;