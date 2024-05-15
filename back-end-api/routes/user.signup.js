import express from "express";
import { userSignUpController } from "../controllers/user.signup.js";

// import router from "router";

const router = express.Router();

router.route("/signup").post(userSignUpController);

export default router;