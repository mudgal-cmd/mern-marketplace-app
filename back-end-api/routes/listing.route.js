import express from "express";
import { CreateListingController, deleteListingController, updateListingController, fetchListingByIdController, getListingsController } from "../controllers/listings.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/create-listing").post(verifyUserToken, CreateListingController); // allow creating the listings to only those customers who have logged in. id param is of the user.

router.route("/get-listing/:id").get(fetchListingByIdController); // we do not need to verify the user as the listing would be visible publicly

router.route("/delete-listing/:id").delete(verifyUserToken, deleteListingController);

router.route("/update-listing/:id").put(verifyUserToken, updateListingController);

router.route("/search").get(getListingsController);

export default router;