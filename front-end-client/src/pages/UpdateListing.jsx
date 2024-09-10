import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

import axios from "axios";

import { app } from "../firebase.js";

import { useNavigate, useParams } from "react-router-dom";

// import { createListingStart, createListingSuccess, createListingFailure } from "../redux/listing/listingSlice.js";
  
const UpdateListing = () => {

  const [listingFormData, setListingFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 0,
    discountPrice: 0,
    bathrooms: 0,
    bedrooms: 0,
    furnished: false,
    parking: false,
    listingType: "rent",
    offer:false,
    imageURLs:[],
    createdBy: ""
    });
  
  // const {currentListing, loadingListing, error} = useSelector(state => state.listing);
  
  const param = useParams();

  console.log("Parameter is ",param);

  const {currentUser} = useSelector(state => state.user); // need to tap into the user state to get the user id to be passed as a param

  const[listingFiles, setListingFiles] = useState([]);

  const[imageUploadError, setImageUploadError] = useState(false);

  const [loadingImage, setLoadingImage] = useState(false); // state to display loading when user clicks upload

  const [formLoading, setFormLoading] = useState(false); // state to handle the loading after submitting the create listing form

  const [listingFormError, setListingFormError] = useState(false);

  const navigate = useNavigate();

  // const dispatch = useDispatch();

  useEffect(()=> {

    (function fetchListing(){

    })

  }, []);
  
  const getListingImage = () => {
    setListingFormError(false);
    if(listingFiles.length>0 && listingFiles.length + listingFormData.imageURLs.length<7){//listingFiles is FileList object and not exactly a true array.

      let promises = []
      // console.log(Array.isArray(listingFiles));
      // console.log(listingFiles);
      for(let file of listingFiles){
        promises.push(storeImageInFirebase(file));
      }
      
      setLoadingImage(true);
      Promise.all(promises).then((urls) => {
        console.log(urls);
        console.log(Array.isArray(urls));


        //directly using imageURLs : urls will just replace the imageURLs with the new/uploaded ones, and we don't want that. We'd like to retain the previous URLs as well and just add the new ones to the older imageURL array

        setListingFormData({...listingFormData, imageURLs:listingFormData.imageURLs.concat(urls)}); 
        
        //can't use push as it just modifies the existing imageURLs array, so React won't detect the changes and no re-renders will be triggered. On the other hand, concat promotes immutability as it returns a new array/ object reference for React to recognize it and trigger the re-renders.

        setImageUploadError(false); //to remove any previous errors

        
      }).catch(error=> {
        setImageUploadError("Uploaded Image size cannot exceed 2MB.");
        setImageUploadError(error);
        setLoadingImage(false);
      });
      console.log(listingFormData);
      
      setLoadingImage(false);
    }
    else setImageUploadError("You can upload a max of 6 images");

    //can't modify the name at this point because, the onChange will fire only when the file to be uploaded is different from the current chosen file, and hence the file name won't change if we choose that same file over and over again, and we want to track every version of the uploaded file.

  } // function to get the current image

  const storeImageInFirebase = async (file) => {

    return new Promise((resolve, reject) => {

      const storage = getStorage(app);
  
      // console.log(file.name);
  
      const listingImageName = new Date().getTime() + file.name;
  
      // console.log(listingImageName);
      // console.log(typeof listingImageName);
  
      const storageRef = ref(storage, listingImageName);
  
      const uploadListingImageTask = uploadBytesResumable(storageRef, file);
  
      uploadListingImageTask.on("state_changed", 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
          // console.log(file);
          console.log("File upload ",progress,"%");
        },
        (error) => {console.log(error);
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadListingImageTask.snapshot.ref).then(
            (downloadURL) => {console.log(downloadURL);
              resolve(downloadURL);
            }
          )
        }
      )
    }); 
  }

  const handleListingFormChange = (event) => {

    setImageUploadError(false);
    setListingFormError(false);

    setListingFormData({...listingFormData, [event.target.name]: event.target.value});
    // console.log(event); 
  } // event handler function for the form data except the checkboxes.

  const handleFormCheckboxChange = (event) => {
    setListingFormError(false);
    setImageUploadError(false);
    if(event.target.name === "rent" || event.target.name === "sell") setListingFormData({...listingFormData, listingType: event.target.name});
    
    else if (event.target.name === "offer" || event.target.name === "parking" || event.target.name === "furnished") setListingFormData({...listingFormData, [event.target.name]: event.target.checked});

    console.log(listingFormData);
  } // event handler function for the checkboxes, as we are storing the value of checkboxes (if a checkbox is checked or not) as boolean in our schema/db.
  
  // console.log(listingFormData);

  const deleteImage = (index) => {

    // listingFormData.imageURLs.splice(index,1);

    setImageUploadError(false);
    setListingFormError(false);

    const filteredImageUrls = listingFormData.imageURLs.filter((url, i) => i!==index);

    console.log(filteredImageUrls);
 
    setListingFormData({...listingFormData, imageURLs: filteredImageUrls});

  }
  console.log(listingFormData);
  const handleListingSubmit = async (event) => {

    // dispatch(createListingStart());

    event.preventDefault();
    if(listingFormData.imageURLs.length<1) return setListingFormError("Please upload at least 1 image"); 

    if(+listingFormData.regularPrice < +listingFormData.discountPrice) return setListingFormError("Discounted price should be lower than the Regular Price"); //added the unary operator "+" to ensure that these values remain numerical.

      setFormLoading(true);
  
      // console.log(listingFormData);
      // console.log(currentUser);
  
      await axios.post(`/api/listing/create-listing/`, {...listingFormData, createdBy:currentUser._id}, {headers: {
        "Content-Type": "application/json"
      }}).then(res => {
        console.log(res);
        setFormLoading(false);

        navigate(`/listing/${res.data._id}`); // navigating the user to the page to show the recently created listing.

        // dispatch(createListingSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        setListingFormError(err.response.data.message);
        setFormLoading(false);
      // dispatch(createListingFailure(err.response.data.message));
    });

  }

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">
        Update Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleListingSubmit}>
        <div className="flex gap-4 flex-col flex-1">
          <input type="text" placeholder="Name" name="name" className="border p-3 rounded-lg" id="name" maxLength="62" minLength="5" required onChange={handleListingFormChange} value={listingFormData.name}/>
          <textarea type="text" placeholder="Description" name="description" id="description" className="border p-3 rounded-lg" required onChange={handleListingFormChange} value={listingFormData.description}/>
          <input type="text" placeholder="Address" name="address" id="address" className="border p-3 rounded-lg" required onChange={handleListingFormChange} value={listingFormData.address}/>

          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-2">
            
              <input type="checkbox" id="sell" name="sell" className="w-4" onChange={handleFormCheckboxChange} checked = {listingFormData.listingType === "sell"} />
              <span>Sell</span>

            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" name="rent" className="w-4"onChange={handleFormCheckboxChange} checked = {listingFormData.listingType === "rent"} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" name="parking" className="w-4" onChange={handleFormCheckboxChange} checked = {listingFormData.parking} />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" name="furnished" className="w-4" onChange={handleFormCheckboxChange} checked ={listingFormData.furnished}/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" name="offer" className="w-4" onChange={handleFormCheckboxChange} checked = {listingFormData.offer}/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="number" className="outline-none p-3 rounded-lg text-sm border border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0" max= '10' min= '1' id="bedrooms" name="bedrooms" required onChange={handleListingFormChange} value={listingFormData.bedrooms}/>
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" className="outline-none p-3 rounded-lg text-sm border border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0" id="bathrooms" name="bathrooms" min={1} max={10} required onChange={handleListingFormChange} value={listingFormData.bathrooms}/>
              <p>Bath</p>
            </div>

            <div className="flex gap-2 items-center">
              <input type="number" className="outline-none p-3 rounded-lg text-sm border border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0" id="regularprice" name="regularPrice" required min={50} max={10000000} onChange={handleListingFormChange} value={listingFormData.regularPrice}/>
              <div className="flex flex-col">
                <p>Regular Price</p>
                {listingFormData.listingType !=="sell" &&<p className="text-xs text-center">(&#36; / Month)</p>}
              </div>

            </div>

            {listingFormData.offer && <div className="flex gap-2 items-center">
              <input type="number" className="outline-none p-3 rounded-lg text-sm border border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0" id="discprice" name="discountPrice" required min={50} max={10000000} onChange={handleListingFormChange} value={listingFormData.discountPrice}/>
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                {listingFormData.listingType !== "sell" &&<span className="text-xs text-center">(&#36; / Month)</span>}
              </div>
            </div>} 
            {/* If offer is not there, hiding the discounted price. */}

          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images:
            <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input className="p-3 border border-gray-300 rounded w-full" name="listing-image" type="file" id="images" accept="image/*" multiple onChange={(e) => setListingFiles(e.target.files)}/>
            <button className="p-3 bg-green-700 text-white hover:bg-white transition hover:text-green-700 border hover:border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80" type="button" onClick={getListingImage} disabled={loadingImage}>{loadingImage? "Loading..." : "Upload"}</button>
          </div>

          <p className="text-red-700 text-sm">{imageUploadError? `Error: ${imageUploadError}`: "" }</p>
          {
            listingFormData.imageURLs.length>0 && listingFormData.imageURLs.map((url, index) => (
              <div key={url} className="flex justify-between p-3 border items-center">

                <img src={url} alt="listing image" className="w-20 h-20 object-cover rounded-lg border" />
                                      
                <button type="button" onClick={()=>deleteImage(index)} className="p-3 text-red-700 uppercase rounded-lg hover:opacity-75">Delete</button>
              
              </div>
            ))
          }
          <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:bg-white hover:text-slate-700 border hover:border-slate-700 disabled:opacity-80 transition hover:shadow-lg" disabled={loadingImage || formLoading || listingFormError || imageUploadError} type="submit">{formLoading? "Submitting...": "Update Listing"}</button>  
            {listingFormError && <p className="text-red-700 text-sm">Error: {listingFormError}</p>}
        </div>

        
      </form>
    </main>
  )
}

export default UpdateListing;