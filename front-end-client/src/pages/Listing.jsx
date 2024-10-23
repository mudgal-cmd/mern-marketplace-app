import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare

} from "react-icons/fa";
import {useSelector} from "react-redux";
import ContactLandLord from "../components/ContactLandLord";

const Listing = () => {

  SwiperCore.use([Navigation]); // initialized Swiper.

  const param = useParams();

  const {currentUser} = useSelector((state) => state.user);

  // console.log(currentUser);

  const [listingData, setListingData] = useState({});

  const [loadingPage, setLoadingPage] = useState(true);

  const [error, setError] = useState(false);

  const [copied, setCopied] = useState(false);

  const [contact, setContact] = useState(false);

  useEffect(() => {
    (async function(){

      try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get-listing/${param.listingId}`).then(res => res.json());
        console.log(response);
        if(response.success === false) {
          setError(true); 
          setLoadingPage(false);
          setListingData({});
          return;
        }
        setListingData(response);
        setLoadingPage(false);
        setError(false);
      }
      catch(error){
        setError(error);
        setLoadingPage(false);
      }

    })();
    //dependency array empty would work?
  }, [param.listingId]); // if dependency array is not correctly defined the api request will be made everytime the component renders. We're gonna trigger this side effect everytime the listing id changes in the URL. For ex: a user copies and pastes the URL in the browser and if the id is incorrect they'd see an error - side effect done. Later if the correct id is put in the URL, we'd want to re-render to display the listing info.

  return (
  <main>
    {loadingPage && <p className="text-center my-7 text-2xl">Loading...</p>}
    {error && <h1 className="text-2xl font-semibold text-center my-7">Oops! Something went wrong. We are working on it!</h1>}
    {listingData && !error && !loadingPage && (
      <div>
        <Swiper navigation>
          {listingData.imageURLs.map(
            (url) => (
              <SwiperSlide key={url}>
                <div className="h-[500px]" style={{background:`url(${url}) center no-repeat`, backgroundSize : "cover"}}></div>
              </SwiperSlide>
            )
          )}
        </Swiper>
        <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
          <FaShare className="text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(()=>{setCopied(false)}, 2000);
          }}/>
        </div>
        {copied && (
          <p className="fixed top-[22%] right-[1%] z-10 rounded-md bg-slate-100 p-2">Link Copied!</p>
        )}

        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
          <p className="text-2xl font-semibold">
            {listingData.name} - ${" "} 
            {listingData.offer ? listingData.discountPrice.toLocaleString("en-US")
            : listingData.regularPrice.toLocaleString("en-US")}
            {listingData.listingType === "rent" && " / month"}
          </p>
          <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listingData.address}
          </p>
          <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listingData.listingType === "rent"? "For Rent" : "For Sale"}
              </p>
              {listingData.offer && (<p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md"> ${+listingData.regularPrice - +listingData.discountPrice} discount</p>)}
          </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">
                Description&nbsp;-&nbsp; 
              </span>
              {listingData.description}
            </p>
            <ul className="flex flex-wrap gap-6 sm:gap-8 text-green-900 font-semibold text-sm">
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBed className="text-lg"/>
                {listingData.bedrooms>1 ? `${listingData.bedrooms} beds`: `${listingData.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBath className="text-lg "/>
                {listingData.bathrooms>1 ? `${listingData.bathrooms} baths`: `${listingData.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaParking className="text-lg"/>
                {listingData.parking ? "Parking Spot": "No Parking"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaChair className="text-lg"/>
                {listingData.furnished ? "Furnished": "Unfurnished"}
              </li>
            </ul>
          {currentUser && !contact&& currentUser._id !== listingData.createdBy && <div className="mt-2">
            {/* show the button only when a user is logged in, and this user is different from the one that created the current listing */}
            {/* <textarea className="w-full p-3 outline-blue-600 rounded-lg my-4" placeholder="Write a message here..."/> */}
            <button className="w-full bg-slate-700 text-white p-3 rounded-lg hover:bg-white hover:text-slate-700 border-2 hover:border-slate-700 uppercase hover:font-semibold transition" 
            onClick={()=> setContact(true)}>Contact Landlord</button>
            {/* We also want to hide the button when contact landlord is clicked */}
          </div>}
          {contact && <ContactLandLord listing = {listingData}/>}
        </div>
      </div>
    )}
  </main>
  );
}

export default Listing;