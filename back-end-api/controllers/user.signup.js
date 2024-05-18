import User from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
import { hashPassword } from "../utils/helper.js";

import { errorHandler } from "../utils/error.js";

export const userSignUpController = async (req, res, next)=>{

  // console.log(req.body);
  
  const {username, password, email} = req.body;

  const hashedPwd = hashPassword(password  , 10); //salt rounds is 10
  
  const newUser = new User({username, password : hashedPwd, email});
  
  try{
    
    await newUser.save();
    res.status(200).json({message: "User created successfully..."});

  }

  catch(err){
    next(err); // got to the next middleware
  }

  // catch(err){
  //   next(errorHandler(550, "Something happened. We're working on it")); // example of the usage of the custom error handler
  // }

}