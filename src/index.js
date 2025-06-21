// require('dotenv').config(path: './env') // basic but not looking good
import dotenv from'dotenv'


//below package use in 1st approach
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";


// 2nd approach using db folder (sperater files and folder building connection)
import connectDB from "./db/index.js";

// const app = express() // app taking all functionalites of express object


//config dotenv
dotenv.config({
    path: './env'
})

connectDB()






/*
// Approach 1st which pollute index  file
// using iife for connecting the db by mongoose 
;(async ()=>{
    // using try catch for handling db connection
    try {
        // now connection by await
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("Error",(error)=>{
            console.log("error occur when app is talking with db: ",error);
            throw error;
        }) // error when talking with db

        app.listen(process.env.PORT,()=>{
            console.log(`App is listing on port ${process.env.PORT} `);
        })
    } catch (error) {
        log.error("error occur: ",error);
        throw error;
    }
})()
*/    