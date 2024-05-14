import User from "../models/user.model.js";

export const defaultUserController = (req, res) =>{
  res.status(200).json({message:"Hello from the server...."});
}

export const signUpController = (req, res) => {

  

  res.status(200).json({message: "You signed up successfully"});

}

// export default defaultUserController;