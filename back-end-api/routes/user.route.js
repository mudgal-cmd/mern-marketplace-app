import express from "express";
import {defaultUserController, updateUserController} from "../controllers/user.controller.js"

const router = express.Router();

router.route("/").get(defaultUserController );

router.route("/updateUser").put(updateUserController);

export default router;