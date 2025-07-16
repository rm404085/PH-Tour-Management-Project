import { envVars } from "../config/env"
import { Role } from "../modules/user/user.interfaces";
import { User } from "../modules/user/user.model"
import bycriptjs  from 'bcryptjs';
import { IAuthProvider } from './../modules/user/user.interfaces';

export const seedSuperAdmin = async () => {

    try {
        const isSuperAdminExit = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})
       
        if(isSuperAdminExit){
           console.log("super admin all ready exit");
           return
        }
        const hashedPassword = await bycriptjs.hash(envVars.SUPER_ADMIN_PASSWORD,Number(envVars.BCRYPT_SALT_ROUND));

        const authProvider :IAuthProvider ={
            provider: "credential",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

         
        const payload = {
            name: "SUPER ADMIN",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
            auths: [authProvider]
        }
        console.log("try super admin");

        const superAdmin = await User.create(payload)
        console.log("super admin created successfully");
        console.log(superAdmin);

    } catch (error) {
        console.log(error);
    }


}