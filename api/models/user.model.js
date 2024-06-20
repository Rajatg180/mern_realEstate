import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide name'],
        unique:true,
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
    },
    avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReDCTmvp1NsTFSOLekuCMKOzrU8KYmSVvqUXtNGWynxwYUwr53xAEJqnL7IefBHguBKFw&usqp=CAU",
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;
