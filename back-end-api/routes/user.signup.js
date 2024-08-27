import express from "express";
import { 
  userSignUpController, 
  userSignInController, 
  oauthUserLoginController,
  userSignOutController  
  
} from "../controllers/user.signup-controller.js";
import {verifyUserToken} from "../utils/verifyUser.js";

// import router from "router";

const router = express.Router();

router.route("/signup").post(userSignUpController);

router.route("/signin").post(userSignInController);

router.route("/google").post(oauthUserLoginController);

router.route("/signout/:id").post(verifyUserToken, userSignOutController);

export default router;