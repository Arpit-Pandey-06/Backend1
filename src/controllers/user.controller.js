// we handle controler related to user
import { ApiErorrs } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js"; // it helps regualar async and promise creation check 
// and help in avoid writing regular try catch or promise it works as helping method

import {User} from "../models/user.models.js"
import {FileUploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req,res)=>{
  // get user details from frontend
   // validation - not empty
  //check if user already exist :username and email
  //check if files are givin : images, avatar
  //upload them to cloudinary , avtaar check
  //create user object : for upload on mongo db : create entry in mongo db
  // remove password and refresh tokken filed from response
  // check for user creation 
  // return response other wise error send 


      const {fullName,email,userName,password} = req.body
       console.log(`fullName: ${fullName}, email: ${email}, userName: ${userName}, password: ${password}`)
  
      

    if([fullName,email,userName,password].some((field)=>
    field?.trim===""
    )){
         throw new ApiErorrs(400,"All Fields are compulsory")  
    }

    // check user exist

    const existedUser = User.findOne({
        $or:[{userName},{email}]
    })
    console.log(existedUser);
    
    if(existedUser){
        throw new ApiErorrs(409,"User already Existed")
    }

const avaatarLocalPath = req.files?.avaatar(0)?.path // it check , take the path of uploaded avtaar from multer
const coverImageLocalPath =req.files?.coverImage(0)?.path;
console.log(avaatarLocalPath,"cover image: ",coverImageLocalPath);

    if(!avaatarLocalPath){
        throw new ApiErorrs(400,"Avaatar File is required")
    }

    // upload these images/ files on cloudinary
    const avaatar = await FileUploadOnCloudinary(avaatarLocalPath)
    const coverImage = await FileUploadOnCloudinary(coverImageLocalPath)

    if(!avaatar){
        throw new ApiErorrs(401,"avaatar not upload properly")
    }

    // entry in database Which is done by the help of user model object
    const userValues = await User.create({
        fullName,
        avaatar:avaatar.url,
        coverImage:coverImage?.url || "",// if cover image the give url db otherwise empty that field
        userName:userName.toLowerCase(),
        email,
        password
    })

   const createdUser =  await User.findById(userValues.id).select(
    "-password -refersTokens"
   )
   if(!createdUser){
    throw new ApiErorrs(500,"Somthing Went Wrong While Registring The User")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"USer Registerd Successfully")
   )
} )

export {registerUser}