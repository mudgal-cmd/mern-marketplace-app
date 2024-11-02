import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { hashPassword, validatePassword } from "../utils/helper.js";
import jwt from "jsonwebtoken"; 

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
    //user is now the instance of mongoose document. This instance contains a property object "_doc" that contains our data.
    if(!user){
      return next (errorHandler(404, "User not found. Please sign up before trying to sign in"));
    }
  
    const isValidPassword = validatePassword(password, user.password);
    const{password: pwd, ...userInfo} = user._doc; // we do not want to return the password even though its hashed to ensure security.
    //_doc is the document object that wraps our raw mongo document containing all our data in the response.
  
    if(isValidPassword){
      const token = jwt.sign({id : user._id}, process.env.JWT_SECRET); //Using JWT token for secure data transmission.
      res.cookie("access_token", token, {httpOnly: true, secure:true, sameSite:"None", expires: new Date(Date.now()+24*60*60*1000)}).status(200).json(userInfo);
      //'httpOnly' ensuring that the cookie cannot be accessed by any client-side scripts. 
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

export const oauthUserLoginController = async (req, res, next) => { //controller for users logging in via google oauth
  
  const {name, email, photoURL} = req.body;

  const findUser = await User.findOne({email: email});

  if(findUser){

    const token = jwt.sign({id: findUser._id}, process.env.JWT_SECRET);

    const {password, ...userInfo} = findUser._doc;

    res.cookie("access_token", token, {httpOnly: true, secure: true, sameSite:"None", expires: new Date(Date.now()+24*60*60*1000)}).status(200).send(userInfo);

  }// secure will be set to true when the app is running in the production / https
  else{
    // return res.send("User not found. We'll need to sign them up");

    const randomGeneratedPassword = Math.random().toString(36).slice(-8); //36 in toString attributes to 0-9 digits + A-Z alphabets, and we want the last 8 characters only. Ex: 0.892sha123hh312, because a random number generated from MAth.randon will start with a 0 + decimal.

    // to create a random password with 16 digits - add another set of 8 random characters exactly like above.
    //const randomGeneratedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

    const uniqueUsernameChars = Math.random().toFixed(10).toString(36).slice(-4); //adding random characters at the end of user's name to generate a unique username.

    const saveUser = new User({email: email, password: randomGeneratedPassword, username:  name+uniqueUsernameChars, avatar: photoURL});

    try{

      await saveUser.save();

      res.status(200).json({success: true, message:"User created successfully"});// we need to always send the data back in json only for the browser.

    }
    catch(err){
      next(err);
    }

  }

}

export const userSignOutController = (req, res, next) => {

  const { id } = req.user;

  if(id !== req.params.id) return next(errorHandler(401, "You can only signout from your own account"));
  
  res.clearCookie("access_token").status(204).json({success: true, message: "User logged out"});

}

