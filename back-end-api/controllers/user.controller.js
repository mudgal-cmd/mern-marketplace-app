import User from "../models/user.model.js"; //need to specify the file extension in case of node
import { errorHandler } from "../utils/error.js";
import { hashPassword } from "../utils/helper.js";

export const defaultUserController = (req, res) =>{
  res.status(200).json({message:"Hello from the server...."})
}

export const updateUserController = async (req, res, next) => {
  
  

  const {id} = req.user;

  console.log(req.params.id);

  if(id !== req.params.id) return next(errorHandler(401, "Unauthorized")); // if the _id in body and path params do not match, that means the user do not match, hence we'd throw the error and doesn't let the user proceed with the update.

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

    res.status(200).json(
      userData
    );

  }
  catch(error){
    next(error);
  }

}

// export default defaultUserController;