import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); //loading the env variables

// const express = require("express");
//in order to use the import statement and not the require keyword of common JS, update the package.json file in root, add property "type":module

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("Connected to the DB")) //to check if the db connection is successful or not.
  .catch((err)=> console.log(err));

app.listen(3000, ()=>{
  console.log("Server listening on port 3000...");
});