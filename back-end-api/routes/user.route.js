import express from "express";
import {defaultUserController, updateUserController} from "../controllers/user.controller.js"
import {verifyUserToken} from "../utils/verifyUser.js";

const router = express.Router();

router.route("/").get(defaultUserController );

router.route("/updateUser/:id").put(updateUserController);

export default router;