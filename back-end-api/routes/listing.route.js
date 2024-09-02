import express from "express";
import { CreateListingController } from "../controllers/listings.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/create-listing/:id").post(verifyUserToken, CreateListingController); // allow creating the listings to only those customers who have logged in. id param is of the user.

export default router;