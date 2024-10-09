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

export const getListingsController = async (req, res, next) => {
  try{
    console.log(req.query);

    let limit = +req.query.limit || 9;

    // console.log(typeof limit);

    let startPage = +req.query.startPage || 0; //startPage is crucial in finding out the listing index number that we want to show on a page. For ex: it would be 0 on the 1st page (that has 9 results), then from the next page we'd have listings from 10-19, so here startIndex would be 10 on page 2.

    let offer = req.query.offer;

    if(offer === undefined || offer === false){
      offer = {$in: [false, true]};// we'd still want to show all the listings that do have an offer or not, only if the user does not explicitely check the offer filter (making it true, then get the listings with offer only).

    }// offer would be undefined if a user searches from the search bar, but if a user clicks on the search button from the filters, then offer can only have a false or a true value.

    let furnished = req.query.furnished;

    if(furnished === undefined || furnished===false){
      furnished = {$in : [false, true]};
    }

    let parking = req.query.parking;

    if(parking === undefined || parking === false){
      parking = {$in: [false, true]};
    }

    let listingType = req.query.listingType;

    if(listingType === undefined || listingType==="all"){
      listingType = {$in : ["rent", "sell"]};
    }// type can be undefined when searched from the search bar in the header. All would show all types of listings (sell + rent).

    const searchTerm = req.query.searchTerm || ""; //empty string to just click the search icon.

    const sortBy = +req.query.sortBy || "createdAt";

    const sortOrder = req.query.sortOrder || "desc";

    const listings = await Listing.find({
      name: {$regex: searchTerm, // using regex to search for a pattern in the matched strings.
        $options: "i"},  // 'i' to ignore the case of the searchterm.
        offer,
        furnished,
        parking,
        listingType // all these values have a pre-defined value.
      }).sort({[sortBy]: sortOrder }) // sortBy price in desc order (where sortOrder is desc)
      .limit(limit)
      .skip(startPage); // no of documents to skip. If for the first page, limit is 9, and startPage is 0, then in the next page startPage will be 9, as we'd want the next 9 documents on that page.
  
    if(!listings){
      return res.status(201).json("No listings found");
    }
  
    return res.status(200).json(listings);

  }

  catch(err){
    next(err);
  }


}