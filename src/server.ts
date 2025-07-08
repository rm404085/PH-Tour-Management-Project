/* eslint-disable no-console */
import {Server} from "http";

import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;




const startServer = async() =>{
       
        try {
            console.log(envVars.NODE_ENV);
             await mongoose.connect(envVars.DB_URL)

        console.log("connect to DB!!");

        server = app.listen(envVars.PORT, ()=>{
            console.log(`server is running to port ${envVars.PORT}`);

        })
        } catch (error) {
            console.log(error);
            
        }
}

startServer();

// process.on("unhandledRejection", ()=>{

//     console.log("unhandle rejection server ...suting --down");

//     if(server){
//         server.close(()=>{
//             process.exit(1)
//         })
//     }
//     process.exit(1)
// })

// process.on("uncaughtException", ()=>{

//     console.log("uncaughtException rejection server ...suting --down");

//     if(server){
//         server.close(()=>{
//             process.exit(1)
//         })
//     }
//     process.exit(1)
// })

// throw new Error("I forgot exception error")

// Promise.reject(new Error("I forgot to promise"));

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */

