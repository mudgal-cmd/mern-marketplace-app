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

export const deleteListingController = async (req, res, next) => {

  const {id} = req.params;

  try{
    
    await Listing.findByIdAndDelete(id, {new: true});

    res.status(200).json({success: true, message: "Listing deleted"});

  }
  catch(error){next(error);}

}