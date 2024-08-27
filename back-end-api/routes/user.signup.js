import express from "express";
import { userSignUpController, userSignInController, oauthUserLoginController } from "../controllers/user.signup-controller.js";

// import router from "router";

const router = express.Router();

router.route("/signup").post(userSignUpController);

router.route("/signin").post(userSignInController);

router.route("/google").post(oauthUserLoginController);



export default router;