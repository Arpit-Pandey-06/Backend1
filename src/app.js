import express from 'express';
// import some middleware config 
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
//we use app.use for middlware and config
app.use(cors({
    // this config for resource sharing with other domain origin
origin:process.env.CORS_ORIGIN,
Credential:true
}
))

// configuration for data getting/request for different types by express

//for json req
app.use(express.json({
    limit:'16kb'
}))

//for url req
app.use(express.urlencoded({
    extended:true,
    limit:'20kb'
}))

//for public assest public folder assests such as image,fevicon,files which save on server
app.use(express.static("public"))// public folder name

//cookiesParser: reading and writing and deleting the which takes from user browser at server
app.use(cookieParser());


// =>>  Import "routes  "
// all routes import there

import userRouter from './routes/users.routes.js'

//Router declaration
// we use app.use command because we need to get middleware to activate routes

app.use('/api/v1/user',userRouter) // when user move /user it automatically to corsepondes route which mention in arg such as"userRouter in this eg"

// url : https://localhost:3000/user/register because we call register after user above id
// call login without just change in routes

export  default app;