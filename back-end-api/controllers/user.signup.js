import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const userSignUpController = async (req, res)=>{

  // console.log(req.body);
  
  const {username, password, email} = req.body;

  const hashedPwd = bcryptjs.hashSync(password, 10); //salt rounds is 10
  
  const newUser = new User({username, password : hashedPwd, email});
  
  try{
    
    await newUser.save();
    res.status(200).json({message: "User created successfully..."});

  }

  catch(err){
    res.status(500).json(err.message);
  }

}