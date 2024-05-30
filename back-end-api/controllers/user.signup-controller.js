import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
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

  const{email, password} = req.body;

  try{

    const user = await User.findOne({email: email}); // or we can simply say User.findOne({email}) after ES6
  
    if(!user){
      return next (errorHandler(404, "User not found. Please sign up before trying to sign in"));
    }
  
    const isValidPassword = validatePassword(password, user.password);
  
    if(isValidPassword){
      return res.status(200).json({success: true, user: user});
    }
    else{
      return next(errorHandler(401, "Incorrect password. Please sign in with the correct credentials."));
    }
  }

  catch(err){
    next(err);
  }
  // next()

}