const UpdateListing = () => {
  return (
  
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">
        Create Listing
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
          <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:bg-white hover:text-slate-700 border hover:border-slate-700 disabled:opacity-80 transition hover:shadow-lg" disabled={loadingImage || formLoading || listingFormError || imageUploadError} type="submit">{formLoading? "Submitting...": "Create Listing"}</button>  
            {listingFormError && <p className="text-red-700 text-sm">Error: {listingFormError}</p>}
        </div>

        
      </form>
    </main>

  );
}

export default UpdateListing;