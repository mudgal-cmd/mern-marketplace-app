import User from "../models/user.model.js"; //need to specify the file extension in case of node

export const defaultUserController = (req, res) =>{
  res.status(200).json({message:"Hello from the server...."})

}

export const updateUserController = (req, res, next) => {
  // res.send("Updated user");

}



// export default defaultUserController;