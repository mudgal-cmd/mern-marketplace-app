import express from "express";
import {defaultUserController} from "../controllers/user.controller.js"

const router = express.Router();

router.route("/").get(defaultUserController );

export default router;