import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {SwiperSlide, Swiper} from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";

function Home(){

  const [listingsWithOffer, setListingsWithOffer] = useState([]);
  const [listingsForSale, setListingsForSale] = useState([]);
  const [listingsForRent, setListingsForRent] = useState([]);

  useEffect(()=>{
    (async function fetchListingsWithOffer (){
      try{

        const response = await axios.get(`/api/listing/get?offer=true&limit=4`);
        console.log(response.data);
        setListingsWithOffer(response.data);
        fetchListingsForSale(); // we want to call the functions 1 by 1 for the better user ex
      }
      catch(err){
        console.log(err);
      }
    })();
    async function fetchListingsForSale(){
      try{
        
        const response = await axios.get(`/api/listing/get?listingType=sell&limit=4`);
        console.log(response.data);
        setListingsForSale(response.data);
        fetchListingsForRent();
      }
      catch(err){console.log(err);}
    };
    async function fetchListingsForRent(){
      try{

        const response = await axios.get(`/api/listing/get?listingType=rent&limit=4`);
        console.log(response.data);
        setListingsForRent(response.data);
      }
      catch(err){
        console.log(err);
      }
    }
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

      {
        listingsWithOffer && listingsWithOffer.length>0 && 
        listingsWithOffer.map((offerListing) => (
          <SwiperSlide>
            <div style={{background:`url(${offerListing.imageURLs[0]})center no-repeat`, backgroundSize:"cover"}} className="h-[500px]" key={offerListing._id}>

            </div>
          </SwiperSlide>
        ))
      }

      {/* listing results for offer */}
    </div>
  );
}

export default Home;