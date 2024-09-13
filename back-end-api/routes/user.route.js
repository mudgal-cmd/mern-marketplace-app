import express from "express";
import {fetchUserController, deleteUserController, updateUserController, GetListingsController} from "../controllers/user.controller.js"
import {verifyUserToken} from "../utils/verifyUser.js";

const router = express.Router();

router.route("/get-user/:id").get(verifyUserToken, fetchUserController );

router.route("/updateUser/:id").put(verifyUserToken, updateUserController); // chaining the MWs, verifying the user token before updating the user.

router.route("/deleteUser/:id").delete(verifyUserToken, deleteUserController);

router.route("/listings/:id").get(verifyUserToken, GetListingsController); //here :id is the user id that created the listings.

export default router;