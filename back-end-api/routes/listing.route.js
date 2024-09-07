import express from "express";
import { CreateListingController, deleteListingController } from "../controllers/listings.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/create-listing").post(verifyUserToken, CreateListingController); // allow creating the listings to only those customers who have logged in. id param is of the user.

router.route("/delete-listing/:id").delete(verifyUserToken, deleteListingController);

export default router;