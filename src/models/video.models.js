import mongoose,{Schema, Types} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const video_Schema = Schema({
    videoFile:{
        type:String,// Cloudanary url
        required: true
    },
        tumbnail:{
        type:String,// Cloudanary url
        required: true
    },
    description:{
        type:String,// Cloudanary url
        required: true
    },
    title:{
        type:String,// Cloudanary url
        required: true
    },
    duration:{
        type:Number,// Cloudanary url
        required: true
    },
    views:{
        type:Number,// Cloudanary url
        required: true,
        default:0
    },
    isPublished:{
        type:Boolean, // publish karni hai ya nahi
        default:[true,"make false if not publish currently"]
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User" // for current because not any model present
    }



},{timestamps:true})

video_Schema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",video_Schema)