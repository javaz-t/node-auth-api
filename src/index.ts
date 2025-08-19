import  Express   from "express"; 
 import "dotenv/config"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authentication";

const app = Express();
app.use(bodyParser.json());
 app.use(cookieParser());

const port = 3000;

app.use(Express.urlencoded({ extended: true }));

app.listen(
    port,()=>console.log('running')
)

mongoose.connect(process.env.MONGODB_URL as string).then(()=>{
    console.log("mongo connected ");
}).catch((e) =>console.log(` mongoose error : ${e}`))


app.use('/auth',authRouter);
 

// const http = require('http');
// const express = require('express');
// const adminRote=require('./routes/admin');
// const shopRote=require('./routes/shop');
// const app = express();
// app.use(shopRote);
// app.use(adminRote);
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse form data

// app.use('/', (req, res, next) => {
//     res.send('<h1>Page not found</h1>');
// });





// app.listen(3000);
