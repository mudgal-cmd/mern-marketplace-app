import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/user.route.js" //Since we're exporting default/1 feature only from user.router.js. We can directly change the name of the exported module here, rather than changing the name to UserRouter in the export statement in user.route.js. 
import UserSignUpRouter from "./routes/user.signup.js";
import cookieParser from "cookie-parser";
import ListingRouter from "./routes/listing.route.js";
import cors from "cors";


dotenv.config(); //loading the env variables

// const express = require("express");
//in order to use the import statement and not the require keyword of common JS, update the package.json file in root, add property "type":module

const app = express();

app.use(cors({
  origin : ["https://zealous-smoke-0c4212710.5.azurestaticapps.net/"],
  methods: ["POST", "GET"]
}));

app.use(express.json()); // to serve and be able to process the data in the body.

app.use(cookieParser()); // initializing cookie parser middleware.

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("Connected to the DB")) //to check if the db connection is successful or not.
  .catch((err)=> console.log(err));


app.use("/api/user", UserRouter); //ensuring all the routes/requests matching the path, go to the userRouter.

app.use("/api/auth", UserSignUpRouter);

app.use("/api/listing", ListingRouter);

app.listen(3000, ()=>{
  console.log("Server listening on port 3000...");
});



//err - is the error in the input (in case the input is invalid) coming from this middleware, req - data from the client, res - server response, next - to go the next middleware 
app.use((err, req, res, next) => {
  
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";
  console.log("error");
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode, // after ES6, if the key and value is same, we can just keep 1
    message // after ES6, if the key and value is same, we can just keep 1 - either the key or the value
  });

}); // this middleware function is to handle the errors in the input, so that we can skip putting try-catch everywhere in our code where input error pop up.