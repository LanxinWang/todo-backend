import dotenv from "dotenv"

dotenv.config({path: "./config.env"});
const {ATLAS_URI} = process.env;
const mongoose = require('mongoose');

export const connectDb =  mongoose.connect(
    ATLAS_URI, 
    {useNewUrlParser: true}, 
    (err: Error) => {
        if(err) throw new Error("connect failed");
        console.log('connect successfully');
});