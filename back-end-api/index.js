import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/user.route.js" //Since we're exporting default/1 feature only from user.router.js. We can directly change the name of the exported module here, rather than changing the name to UserRouter in the export statement in user.route.js. 
import UserSignUpRouter from "./routes/user.signup.js";
import cookieParser from "cookie-parser";
import ListingRouter from "./routes/listing.route.js";
import cors from "cors";

// encountered a type related error for express, cookie-parser and cors, hence used the command 'npm i -D @types/module-name' to install the required types. This error could be related to Azure devops that was using something that was expecting typescript definitions.


dotenv.config(); //loading the env variables

// const express = require("express");
//in order to use the import statement and not the require keyword of common JS, update the package.json file in root, add property "type":module

const app = express();

app.use(cors({
  origin : "https://zealous-smoke-0c4212710.5.azurestaticapps.net", // updated the CORS origin to azure URL
  // origin : "http://localhost:5001",
  credentials: true
})); // enabled cors to allow the frontend to communicate with the backend.

app.use(express.json()); // to serve and be able to process the data in the body.

app.use(cookieParser()); // initializing cookie parser middleware.

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("Connected to the DB")) //to check if the db connection is successful or not.
  .catch((err)=> console.log(err));


app.use("/api/user", UserRouter); //ensuring all the routes/requests matching the path, go to the userRouter.

app.use("/api/auth", UserSignUpRouter);

app.use("/api/listing", ListingRouter);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});// added a health check endpoint to ensure there're no missing env variables.

const port = process.env.PORT || 8080;

app.listen(port, ()=>{
  console.log(`Server running at : ${port}`);
}).on('error', (err) => {
  console.error('Failed to start the server: ', err);
});
// updated the port here because container was starting the app on 8080, but we had 3000 earlier



//err - is the error in the input (in case the input is invalid) coming from this middleware, req - data from the client, res - server response, next - to go the next middleware 
app.use((err, req, res, next) => {
  
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";
  console.log("Error from index.js",message);
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode, // after ES6, if the key and value is same, we can just keep 1
    message // after ES6, if the key and value is same, we can just keep 1 - either the key or the value
  });

}); // this middleware function is to handle the errors in the input, so that we can skip putting try-catch everywhere in our code where input error pop up.