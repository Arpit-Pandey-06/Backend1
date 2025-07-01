import multer from "multer"

// file middleware by multer

// we use diskstorage for upload file it provide us object which use two key destination and filename which take
// value as function (request, file, callback)
// calback take arg:1st is null and 2nd where we store file
const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,"./public/temp")
    },
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

export const upload = multer({
    storage // function name
})