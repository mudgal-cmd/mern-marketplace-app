import express from "express";
import {defaultUserController, deleteUserController, updateUserController} from "../controllers/user.controller.js"
import {verifyUserToken} from "../utils/verifyUser.js";
import { GetListingsController } from "../controllers/listings.controller.js";
const router = express.Router();

router.route("/").get(defaultUserController );

router.route("/updateUser/:id").put(verifyUserToken, updateUserController); // chaining the MWs, verifying the user token before updating the user.

router.route("/deleteUser/:id").delete(verifyUserToken, deleteUserController);

router.route("/listings/:id").get(verifyUserToken, GetListingsController);

export default router;