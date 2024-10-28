import { ShowListing } from "../components/ShowListing";

import {useState, useEffect} from "react";

import { useNavigate } from "react-router-dom";

const SearchComponent = () => {

  const navigate = useNavigate();

  const [listings, setListings] = useState([]);

  console.log(listings);

  const [loading, setLoading] = useState(false); // for the loading effect

  const [showMoreListings, setShowMoreListings] = useState(false);

  const [searchFilterData, setSearchFilterData] = useState({
    searchTerm: "", //this searchTerm key needs to be same as specified in the header component, so that if a user updates a searchTerm anywhere - either using the search bar or the filters section, the value should remain consistant throughout.
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


  const handleSearchFilterSubmit = async (e) => {
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

  useEffect(()=>{
    const params = new URLSearchParams(location.search);

    // we could've used a loop as well, and to do so, we need to create a shallow copy of the state, ex: const updatedListingsData = searchFilterListings; and then update the updatedLisitingsData using the loop and pass this new piece of info int the setter function.

    const searchTermFromUrl = params.get("searchTerm");
    const listingTypeFromUrl = params.get("listingType");
    const parkingFromUrl = params.get("parking");
    const furnishedFromUrl = params.get("furnished");
    const offerFromUrl = params.get("offer");
    const sortByFromUrl = params.get("sortBy");
    const sortOrderFromUrl = params.get("sortOrder");

    

    if(searchTermFromUrl || listingTypeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortByFromUrl || sortOrderFromUrl){
      setSearchFilterData({
        searchTerm: searchTermFromUrl,
        listingType: listingTypeFromUrl,
        parking: parkingFromUrl === "true"? true: false,
        furnished: furnishedFromUrl === "true"? true: false,
        offer: offerFromUrl === "true"? true: false,
        sortBy: sortByFromUrl?sortByFromUrl:"createdAt",
        sortOrder: sortOrderFromUrl? sortOrderFromUrl:"desc"
      });
    }

    (async function (){
      setLoading(true);
      const searchQuery = params.toString();
      const response = await fetch (`/api/listing/get?${searchQuery}`);
      const data = await response.json();

      if(data.length>8){
        setShowMoreListings(true);
      }
      else setShowMoreListings(false); // this condition will ensure that the show more button does not get displayed if the initial data itself is less than 9, i.e., if the initial data/response < 9 then there will not be any more data than this.

      console.log(data);
      setListings(data);
      setLoading(false);
      
    })(); // to make an API call whenever a filter is changed by the user.

  }, [location.search]);

  const handleShowMoreListings = async()=>{
    const startPage = listings.length; // so this will be dynamic, 1st api call - value would be 9, then 18, so when the Show more button gets clicked, 18 - 27 will be fetched and the new length of the listings array would be 27.
    const params = new URLSearchParams(location.search);
    params.set("startPage", startPage);
    const searchQuery = params.toString();
    const response = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await response.json();
    console.log(data);
    console.log(`start page - ${startPage}`);
    console.log(searchQuery);
    if(data.length<9){
      setShowMoreListings(false);
    }
    setListings([...listings, ...data]);
  }
  // console.log(listings);
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

      <div className="flex-1"> {/*for the search results */}
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Search Results:</h1>
      <div className="p-7 flex flex-wrap gap-4">

        {!loading && listings.length===0 && (
          <p className="text-slate-700 text-xl">No Listings Found!</p>
        )}
        {loading && (
          <p className="text-xl text-slate-700 text-center w-full">
            Loading....
          </p>
        )}
        {!loading && listings.length>0 && listings.map((listing) => (
          <ShowListing key={listing._id} listing={listing}/>
        ))
        
        }
        {showMoreListings && (
          <button className="bg-green-600 text-white mt-2 rounded-lg text-sm px-5 py-3 hover:text-green-600 hover:bg-white border hover:border-green-600 transition text-center w-full hover:border-2 font-semibold" onClick={handleShowMoreListings}>Show More</button>
        )}
      </div>
      </div>
        
    </div>
  );

}

export default SearchComponent;