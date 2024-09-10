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

  const listing = await Listing.findById(id);

  console.log(typeof listing._id);

  if(!listing) return next(errorHandler(404, "Listing not found"));
  
  if(req.user.id !== listing.createdBy) return next(errorHandler(401, "You can delete a listing from your account only"));

  try{
    
    await Listing.findByIdAndDelete(id, {new: true});

    res.status(200).json({success: true, message: "Listing deleted"});

  }
  catch(error){next(error);}

}

export const updateListingController = async (req, res, next) => {

  const {id} = req.params;

  const listingToUpdate = await Listing.findById(id);

  if(!listingToUpdate) return next(errorHandler(404, "Listing not found"));

  if(req.user.id !== listingToUpdate.createdBy) return next(errorHandler(401, "You can update a listing from your account only."));

  try {
    
    const updatedListing = await Listing.findByIdAndUpdate(id, {
      $set: {
        name: req.body.name,
        description: req.body.description, 
        address: req.body.address, 
        regularPrice: req.body.regularPrice,
        discountPrice: req.body.discountPrice,
        bathrooms: req.body.bathrooms, 
        bedrooms: req.body.bedrooms,
        furnished: req.body.furnished,
        parking: req.body.parking,
        listingType: req.body.listingType,
        offer: req.body.offer,
        imageURLs: req.body.imageURLs
      }
    }, {new: true});

    res.status(200).json(updatedListing);

  } catch (error) {
    next(error);
  }

}


export const fetchListingByIdController = async (req, res, next) => {

  try{

    const {id} = req.params;
    
    const listing = await Listing.findById(id);
    
    if(!listing) return next(errorHandler(404, "Listing not found"));

    return res.status(200).json(listing);
  }
  
  catch(error){next(error);}
  

}