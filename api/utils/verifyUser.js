import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';


export const verifyToken=(req,res,next)=>{
    // we have passed cookies as named access_token
    const token = req.cookies.access_token;

    if(!token){
        return next(errorHandler(401,'Unauthorized'));
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{

        if(err){
            return next(errorHandler(403,'Forbidden'));
        };

        // if the token is verified successfully it returns user then we will attach user to req and send it to next function 
        req.user=user;

        // then we will go to next middleware in this case it is (updateUser);
        next();
    });


}