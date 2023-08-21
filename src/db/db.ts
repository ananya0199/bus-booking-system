import mongoose, { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.set("strictQuery", false);

const connectDb= async ()=>{
    try {
        const DB_URL = process.env.DB_URL || "";

        await connect(DB_URL)
        console.log("db connected successfully");
        
        
    } catch (error) {
        console.log("Something went wrong in db");
        
        
    }
    
}
export default connectDb;