import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async (req, res,next) => {

  const { username, email, password } = req.body;

  //using hashSync no need to use await
  const hashPassword = bcryptjs.hashSync(password,10);

  const newUser = new User({ username, email, password : hashPassword });

  try{
    await newUser.save();
    res.status(201).json("user created successfully");
  }
  catch(err){
    // this is default error which we get from catch block
    next(err);

    // manual error which is created by us 
    // next(errorHandler(500,'error from the function'));
  }

};


export const signin= async (req,res,next)=>{

    const {email,password}=req.body;

    try{
        // const validUser = await User.findOne({email:email});
        // or (ES6)
        const validUser = await User.findOne({email});

        if(!validUser){
            return next(errorHandler(404,'User not found'));
        }
        
        const validPassword = bcryptjs.compareSync(password,validUser.password);

        if(!validPassword){
            return next(errorHandler(401,'Wrong Credentials'));
        }

        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);

        // removing the password from valide user 
        const {password:pass,...rest}=validUser._doc;

        // attaching cookies to the response
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        
    }catch(err){
        next(err);
    }
}

export const google =async (req,res,next)=>{

  try{

    const user = await User.findOne({email:req.body.email});

    if(user){

      const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
      
      // removing the password from user 
      const {password:pass,...rest}=user._doc;

      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

    }
    else{
      // we are generating random password because our OAuth do not have any password but the password is reuired by the model 
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword,10);

      const newUser = new User({ username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email : req.body.email , password : hashedPassword , avatar : req.body.photo});

      await newUser.save();
      
      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      
      // removing the password from user 
      const {password:pass,...rest}=newUser._doc;

      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

    }

  }
  catch(err){
    next(err);
  }

}


export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};