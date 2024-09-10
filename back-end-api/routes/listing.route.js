import express from "express";
import { CreateListingController, deleteListingController, updateListingController, fetchListingByIdController } from "../controllers/listings.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/create-listing").post(verifyUserToken, CreateListingController); // allow creating the listings to only those customers who have logged in. id param is of the user.

router.route("/get-listing/:id").get(verifyUserToken, fetchListingByIdController);

router.route("/delete-listing/:id").delete(verifyUserToken, deleteListingController);

router.route("/update-listing/:id").put(verifyUserToken, updateListingController);

export default router;