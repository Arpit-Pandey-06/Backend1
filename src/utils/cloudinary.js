import {v2 as Cloudinary} from 'cloudinary'
import fs  from 'fs'

    // config the cloudinary
    Cloudinary.config({
        cloud_name :process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })


const FileUploadOnCloudinary = async (loaclpath)=>{
    try{
    if(!loaclpath) return null
    // upload file 
     const response = await Cloudinary.uploader.upload(loaclpath,{resource_type : 'auto'}) // args :1st file path, 2nd option in which (response_type and which auto detect)
    // print message after uplaod for us
    console.log("file upload seccessfull ",response.url);
    //return response for user
    return response
}

catch (error){
// unlink / remove the local tempory file from local server to prevent malicous operation
fs.unlinkSync(loaclpath)
return null
}
}

export {FileUploadOnCloudinary}