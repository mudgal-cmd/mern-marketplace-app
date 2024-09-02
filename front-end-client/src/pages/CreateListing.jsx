import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";

import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

import axios from "axios";


const CreateListing = () => {

  const [listingFormData, setListingFormData] = useState({});

  const {currentListing, loadingListing, error} = useSelector(state => state.listing);

  const handleListingFormChange = (event) => {

  }

  const handleListingSubmit = () => {

    axios.post("/api/listing")

  }

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleListingSubmit}>
        <div className="flex gap-4 flex-col flex-1">
          <input type="text" placeholder="Name" name="name" className="border p-3 rounded-lg" id="name" maxLength="62" minLength="5" required onChange={handleListingFormChange}/>
          <textarea type="text" placeholder="Description" name="description" id="description" className="border p-3 rounded-lg" required onChange={handleListingFormChange} />
          <input type="text" placeholder="Address" name="address" id="address" className="border p-3 rounded-lg" required onChange={handleListingFormChange}/>

          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-2">
            
              <input type="checkbox" id="sell" name="sell" className="w-4" onChange={handleListingFormChange}/>
              <span>Sell</span>

            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" name="rent" className="w-4"onChange={handleListingFormChange} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" name="parking" className="w-4" onChange={handleListingFormChange}/>
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" name="furnished" className="w-4" onChange={handleListingFormChange}/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" name="offer" className="w-4" onChange={handleListingFormChange}/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="number" className="outline-none p-3 rounded-lg text-sm border border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0" max= '10' min= '1' id="bedrooms" name="bedrooms" required onChange={handleListingFormChange}/>
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" className="outline-none p-3 rounded-lg text-sm border border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0" id="bathrooms" name="bathrooms" min={1} max={10} required onChange={handleListingFormChange}/>
              <p>Bath</p>
            </div>

            <div className="flex gap-2 items-center">
              <input type="number" className="outline-none p-3 rounded-lg text-sm border border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0" id="regularprice" name="regularPrice" required min={50} max={10000000} onChange={handleListingFormChange}/>
              <div className="flex flex-col">
                <p>Regular Price</p>
                <p className="text-xs text-center">(&#36; / Month)</p>
              </div>

            </div>

            <div className="flex gap-2 items-center">
              <input type="number" className="outline-none p-3 rounded-lg text-sm border border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0" id="discprice" name="discountPrice" required min={50} max={10000000} onChange={handleListingFormChange}/>
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs text-center">(&#36; / Month)</span>
              </div>
            </div>

          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images:
            <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/*" multiple onChange={handleListingFormChange} />
            <button className="p-3 bg-green-700 text-white hover:bg-white transition hover:text-green-700 border hover:border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
          <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:bg-white hover:text-slate-700 border hover:border-slate-700 disabled:opacity-80">Create Listing</button>  
        </div>
        
      </form>
    </main>
  )
}

export default CreateListing;