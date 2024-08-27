import User from "../models/user.model.js"; //need to specify the file extension in case of node
import { errorHandler } from "../utils/error.js";
import { hashPassword } from "../utils/helper.js";

export const defaultUserController = (req, res) =>{
  res.status(200).json({message:"Hello from the server...."})
}

export const updateUserController = async (req, res, next) => {

  // console.log(req);

  const {id} = req.user;

  // console.log(req.params.id);

  if(id !== req.params.id) return next(errorHandler(401, "Unauthorized")); // if the _id in body and path params do not match, that means the user do not match, hence we'd throw the error and doesn't let the user proceed with the update.

  console.log(req.body);

  try{
    if(req.body.password) {
       req.body.password = hashPassword(req.body.password, 10); //if user wants to update the password, in other words if password is present in the req.body then we'd hash it.
    }



    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: { // our body/payload could possibly contain some additional info, we would just extract whatever we need, nothing extra.
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        avatar: req.body.avatar
      }
    }, {new: true}); // using "new: true" will actually return the user after doing the update operation, otherwise it would have returned the previous user object without the updates

    const {password, ...userData} = updatedUser._doc;

    res.status(200).json({
      "success": true,
      "message": "User updated successfully",
      userData
    }
    );

  }
  catch(error){
    next(error);
  }

}

export const deleteUserController = async (req, res, next) => {
  console.log(req.user);
  console.log(req.cookies);
  console.log(req.params);

  const { id } = req.user; // getting the user id after verifying/decrypting the JWT access token 

  if(id!==req.params.id) return next(errorHandler(403, "Unauthorized.")); //matching the params id (from the request) with the decoded value of the access token that we encrypted while signing the JWT token and creating the cookie.

  console.log(id);
  try{

    const userToBeDeleted = await User.findByIdAndDelete(id, {new: true}); // ? do we want the user after deleting it? if not, then new should be set to true.

    res.status(200).json({success: true, message: "User deleted successfully", userToBeDeleted});

  }
  catch(error){next(error);} // handling any possible errors during the operations so that our app doesn't crash.
  

}