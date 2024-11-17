import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://lingeswaranv:Lingeswaran7@cluster0.hlzbjex.mongodb.net/food-del').then(()=>console.log("Db connected"));

}