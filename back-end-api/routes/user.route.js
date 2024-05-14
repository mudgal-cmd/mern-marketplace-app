import express from "express";
import {defaultUserController, signUpController} from "../controllers/user.controller.js"

const router = express.Router();

router.route("/").get(defaultUserController );

router.route("/signup").post(signUpController);

export default router;