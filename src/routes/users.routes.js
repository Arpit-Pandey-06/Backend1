import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route("/register").post(
    // this field handle the file upload before doig exact task by help of multer middleware
    upload.fields([
        {
            name:"avaatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ])
    ,registerUser)

export default router;