import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
        const connectionResponseHold = await mongoose.connect(`${process.env.MONGODB_URI},${DB_NAME}`)
        console.log(`connection MongoDb done: ${connectionResponseHold.connection.host}`);//.connection.host to get proper url
        
    } catch (error) {
        console.error("MONGODB Connection  Failed error ",error);
        //node give the inbuilt method to handle the process and we use exit event and code learn, latter
        process.exit(1)
    }
}

export default connectDB // exporting the complete variable