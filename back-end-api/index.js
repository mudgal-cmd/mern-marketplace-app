import express from "express";

// const express = require("express");
//in order to use the import statement and not the require keyword of common JS, update the package.json file in root, add property "type":module

const app = express();

app.listen(3000, ()=>{
  console.log("Server listening on port 3000...");
});