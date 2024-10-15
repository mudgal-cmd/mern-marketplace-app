const SearchComponent = () => {

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen"> {/* for the left side or the search part/filters */}
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <input type="text" id="searchterm" name="searchterm" placeholder="Start searching here..." className="p-3 rounded-lg border w-full"/>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-4"/>
              <span>Rent & sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" name="listingtype" className="w-4"/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sell" name="listingtype" className="w-4"/>
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4"/>
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4"/>
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" name="listingtype" className="w-4"/>
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort:</label>
            <select className="p-3 border-none rounded-lg outline-none" id="sort_order" >
              <option value="Latest">Price low to high</option>
              <option value="Latest">Price high to low</option>
              <option value="Latest" selected= "selected">Latest</option>
              <option value="Latest">Oldest</option>
            </select>
          </div>

          <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 transition">Search</button>

        </form>
      </div>

      <div className=""> {/*for the search results */}
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Search Results:</h1>
      </div>
    </div>
  );

}

export default SearchComponent;