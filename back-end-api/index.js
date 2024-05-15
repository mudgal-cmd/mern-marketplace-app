import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/user.route.js" //Since we're exporting default/1 feature only from user.router.js. We can directly change the name of the exported module here, rather than changing the name to UserRouter in the export statement in user.route.js. 
import SignUpRouter from "./routes/user.signup.js";
import UserSignUpRouter from "./routes/user.signup.js";


dotenv.config(); //loading the env variables

// const express = require("express");
//in order to use the import statement and not the require keyword of common JS, update the package.json file in root, add property "type":module

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("Connected to the DB")) //to check if the db connection is successful or not.
  .catch((err)=> console.log(err));


app.use("/api/user", UserRouter); //ensuring all the routes/requests matching the path, go to the userRouter.

app.use("/api/auth", UserSignUpRouter);


app.listen(3000, ()=>{
  console.log("Server listening on port 3000...");
});