import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import  jsonwebtoken  from "jsonwebtoken";
const user_Schema = new Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true, // use for easy search in database and heavy costly functionaliry only needed then use
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true
    },
    fullName:{
        type: String,
        required:true,
        trim:true,
        index:true
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    avaatar:{
        type:String, // url of thirparty service cloudanary
        required:true 
    },
    coverImage:{
        type:String,
        required:true
    },
    password:{
        type:String, // always in encryped form in plan string so learn latter
        required:[true,"Insert Password neccessary"]
    },
    refersTokens:{
        type:String
    }
},{timestamps:true})





export const User = mongoose.model("User",user_Schema)