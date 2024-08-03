import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyUserToken = (req, res, next) => { // function to verify the user jwt token saved in the cookie.
  // console.log("User verified");
  // console.log("Verify token executed");

  const {access_token} = req.cookies; //destructuring the cookie to get the current token.

  // console.log(access_token);

  jwt.verify(access_token, process.env.JWT_SECRET, (err, decoded) => { //jwt.verify() method takes 3 arguments, the callback being the 3rd one.
    if(err) return next(errorHandler(403, "Forbidden")); // if there is any error during the token verification, break the execution and send the error

    req.user = decoded; // saving the decoded data which looks like - { id: '665279ee49172e2f2d179a5f', iat: 1722643603 }
    // console.log(decoded.id);
    next(); // passing the execution to the next MW in the line, i.e., updateUserController.
  });

}
