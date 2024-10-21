import { ShowListing } from "../components/ShowListing";

import {useState, useEffect} from "react";

import { useNavigate } from "react-router-dom";

const SearchComponent = () => {

  const navigate = useNavigate();

  const [listings, setListings] = useState({});

  const [searchFilterData, setSearchFilterData] = useState({
    searchTerm: "",
    listingType: "all",
    parking: false,
    furnished: false,
    offer: false,
    sortBy: "createdAt",
    sortOrder: "desc"

  }); // state to manage the search filters from the sidebar

  const handleSearchFilterOnChange = (event) => {
    
    if(event.target.name === "searchTerm") {

      setSearchFilterData({...searchFilterData, "searchTerm": event.target.value});
    };

    if( event.target.name === "offer" || event.target.name === "parking" || event.target.name === "furnished"){

      setSearchFilterData({...searchFilterData, [event.target.name]: event.target.checked || event.target.checked === "true" ? true: false});
      console.log(event);
    }
    if(event.target.name === "all" || event.target.name === "rent" || event.target.name === "sell"){

      setSearchFilterData({...searchFilterData, "listingType": event.target.name});
    }
    if( event.target.name === "sortBy"){
      const sortBy = event.target.value.split("_")[0];
      const sortOrder = event.target.value.split("_")[1];
      setSearchFilterData({...searchFilterData, sortBy, sortOrder});
    }
  }

  // console.log(searchFilterData);


  const handleSearchFilterSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchFilterData.searchTerm);
    urlParams.set("listingType", searchFilterData.listingType);
    urlParams.set("parking", searchFilterData.parking? true: false);
    urlParams.set("furnished", searchFilterData.furnished? true: false);
    urlParams.set("offer", searchFilterData.offer);
    urlParams.set("sortBy", searchFilterData.sortBy);
    urlParams.set("sortOrder", searchFilterData.sortOrder);

    const urlSearchQuery = urlParams.toString(); //converted the urlParams object into the query paramter string 
    // console.log(urlSearchQuery);
    navigate(`/search?${urlSearchQuery}`); // navigating the user to the page
  }

  // useEffect(()=>{
  //   const params = new URLSearchParams(location.search);

  //   // const queryParams = params.get();
  //   // console.log(params.size);

  //   for (let key in searchFilterData){
  //     let value = params.get(`${key}`);
  //     console.log(value);
  //     setSearchFilterData({...searchFilterData, [key]:value});
  //   }
  // }, location.search);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen"> {/* for the left side or the search part/filters */}
        <form className="flex flex-col gap-8" onSubmit={handleSearchFilterSubmit}>
          <div className="flex items-center gap-4">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <input type="text" id="searchTerm" name="searchTerm" placeholder="Start searching here..." className="p-3 rounded-lg border w-full" onChange={handleSearchFilterOnChange} value={searchFilterData.searchTerm}/>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" name="all" checked={searchFilterData.listingType === "all"} className="w-4" onChange={handleSearchFilterOnChange}/>
              <span>Rent & sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" name="rent" className="w-4" onChange={handleSearchFilterOnChange} checked = {searchFilterData.listingType === "rent"}/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sell" name="sell" checked = {searchFilterData.listingType === "sell"} className="w-4" onChange={handleSearchFilterOnChange}/>
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" name="offer" className="w-4" value={searchFilterData.offer === true} onChange={handleSearchFilterOnChange}/>
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" name="parking" checked = {searchFilterData.parking === true} className="w-4" onChange={handleSearchFilterOnChange}/>
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" name="furnished" checked = {searchFilterData.furnished === true} className="w-4" onChange={handleSearchFilterOnChange}/>
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort:</label>
            <select className="p-3 border-none rounded-lg outline-none" id="sortBy" name="sortBy" defaultValue={searchFilterData.sortOrder }onChange={handleSearchFilterOnChange}>
              <option value="regularPrice_desc">Price low to high</option>
              <option value="regularPrice_asc">Price high to low</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 transition">Search</button>

        </form>
      </div>

      <div className=""> {/*for the search results */}
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Search Results:</h1>
        <ShowListing listings = {listings} />
      </div>
    </div>
  );

}

export default SearchComponent;