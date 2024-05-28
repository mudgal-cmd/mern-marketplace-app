import User from "../models/user.model.js";
import { hashPassword, validatePassword } from "../utils/helper.js";

// import { errorHandler } from "../utils/error.js";

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

export const userSignInController = async (req, res, next) => {

  const{username, password} = req.body;

  try{

    const user = await User.findOne({username: username});
  
    if(!user){
      throw new Error("User not found. Please sign up.");
    }
  
    const isValidPassword = validatePassword(password, user.password);
  
    if(isValidPassword){
      return res.status(200).json({success: true, user: user});
    }
    else{
      throw new Error("Incorrect password. Please sign in with the correct credentials.");
    }
  }

  catch(err){
    next(err);
  }
  // next()

}