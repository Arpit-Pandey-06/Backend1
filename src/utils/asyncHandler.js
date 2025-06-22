// By promise method
const asyncHandler =(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}








export  {asyncHandler};


// by approach HigherOrder function 

// //using next for middleware
// const asyncHandler = (fun)=>async(req,res,next)=>{
//     try{
//         await fun(req,res,next)
//     }
//     catch(error){
//         res.status(error.code || 500).json({
//             // respons some json code
//             success:false,
//             message:error.message
//         })
//     }
// }
