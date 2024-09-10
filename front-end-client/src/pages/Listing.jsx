import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {

  SwiperCore.use([Navigation]); // initialized Swiper.

  const param = useParams();

  const [listingData, setListingData] = useState({});

  const [loadingPage, setLoadingPage] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    (async function(){

      try{
        const response = await fetch(`/api/listing/get-listing/${param.listingId}`).then(res => res.json());
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
      </div>
    )}
  </main>
  );
}

export default Listing;