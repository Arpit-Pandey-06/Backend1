// we handle controler related to user

import { asyncHandler } from "../utils/asyncHandler.js"; // it helps regualar async and promise creation check 
// and help in avoid writing regular try catch or promise it works as helping method

const registerUser = asyncHandler(async (req,res)=>{
   return res.status(200).json({
        "message":"Ok Arpit"
    })
} )

export {registerUser}