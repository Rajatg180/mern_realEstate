import express from "express";
import connectDB from "./DB/connection.js";
import dotenv from "dotenv";
dotenv.config();
import userRouter from '../api/routes/user.route.js'
import authRouter from '../api/routes/auth.route.js';
import cookieParser from "cookie-parser";


const app = express();

// to get the body from the user request
app.use(express.json());

// to verify the cookies
app.use(cookieParser());

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message:message
    });
})

const start=async()=>{
    try{
        await connectDB(process.env.MONGO);
        app.listen(3000,() => {
            console.log("Server is running on port 3000!!");
        });
    }
    catch(error){
        console.log(error);
    }
};

start();





