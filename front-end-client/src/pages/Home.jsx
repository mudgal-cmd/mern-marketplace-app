import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home(){

  const [listingsWithOffer, setListingsWithOffer] = useState([]);
  const [listingsForSale, setListingsForSale] = useState([]);
  const [listingsForRent, setListingsForRent] = useState([]);

  useEffect(()=>{
    (async function fetchListingsWithOffer (){
      const response = await axios.get(`/api/listing/get?offer=true`);
      // console.log(response.data);
      setListingsWithOffer(response.data);
    })();
    (async function fetchListingsForSale(){
      const response = await axios.get(`/api/listing/get?listingType=sell`);
      console.log(response.data);
      setListingsForSale(response.data);
    })();
    (async function fetchListingsForRent(){
      const response = await axios.get(`/api/listing/get?listingType=rent`);
      console.log(response.data);
      setListingsForRent(response.data);
    })()
  }, []);

  return(
    <div>
      {/* top */}
        <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">Find your next <span className="text-slate-500">perfect</span>
          <br/> 
          place with ease
          </h1>
        
          <div className="text-gray-400 text-xs sm:text-sm">
            Urban Utopia is the best place to find your next home
            <br />
            We have a wide range of properties to chose from
          </div>
          <Link to='/search' className=" text-xs sm:text-sm text-blue-700 font-semibold hover:opacity-80">
            Let's start searching...
          </Link>
        </div>


      {/* swiper */}


      {/* listing results for offer */}
    </div>
  );
}

export default Home;