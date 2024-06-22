import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import Listing from "../models/listing.model.js";


export const test = (req,res)=>{
    res.send("request recieved");
};

export default test;


export const updateUser = async (req,res,next)=>{


    // this is the user which we have attach at verifyToken 
    // we will check if both id's are same then only we will update the user
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"You can update your own account"))
    }

    try{

        if(req.body.password){
            // hashed password
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }

        // here we are using $set because user may update few things and we are not writing ...req.body because the user may pass some other fields , so we are specifing the things which we can update 
        // {new:true} to set the new response
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set :{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true});
        
        // seperate the password from the doc
        const {password,...rest} = updatedUser._doc;

        res.status(200).json(rest);

    }
    catch(err){
        next(err);
    }
    
}


export const deleteUser = async ( req , res , next )=>{

    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"You can only delete your own account"))
    }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({message:'User had been deleted....'});
        return ;
    }
    catch(err){
        next(err);
    }
}


export const getUserListings = async (req,res,next)=>{
    
    if(req.user.id === req.params.id){
        try{
            const listings= await Listing.find({userRef:req.params.id});
            res.status(200).json(listings);
        }
        catch(err){
            next(err);
        }
    }
    else{
        return next(errorHandler(401,'You can only view your own listings'))
    }
}