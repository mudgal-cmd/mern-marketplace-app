import express from "express";
import { CreateListingController } from "../controllers/listings.controller";
import { verifyUserToken } from "../utils/verifyUser";

const router = express.Router();

router.route("/create-listing").post(verifyUserToken, CreateListingController); // allow creating the listings to only those customers who have logged in.

export default router;