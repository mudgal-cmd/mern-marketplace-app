import Listing from "../models/listings.model.js";
import { errorHandler } from "../utils/error.js";

export const CreateListingController = async (req, res, next) => {

  // const {id} = req.params;

  // if(id !== req.user.id) return next(errorHandler(401, "You can create a property listing from your own account only"));

  try {

    const listingToSave = await Listing.create(req.body);  
    return res.status(201).json(listingToSave);

  }
   catch(error) {
    return next(error);
   }


}

export const GetListingsController = async (req, res, next) => {

  const {id} = req.params;
  
  console.log(req.params);
  console.log(id);

  if(id !== req.user.id) return next(errorHandler(401, "You are not authorized to fetch the listings"));

  try{
    const listings = await Listing.find({createdBy:id});
    return res.status(200).json({success: true, results:listings.length, data:listings});
  }
  catch(err){
    return next(err);
  }

}