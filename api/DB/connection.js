import mongoose from "mongoose";


const connectDB=(url)=>{
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: { w: 'majority' },
     });
};

export default connectDB;
