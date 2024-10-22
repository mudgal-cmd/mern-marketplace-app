import {Link} from "react-router-dom";
import {MdLocationOn} from "react-icons/md";

//installed LineClamp plugin to allow truncating multiple lines on a web page

export const ShowListing = ({listing}) => {
  return (
    <div className=" shadow-md bg-white h-80 rounded-xl mt-5 ml-5 gap-4 hover:shadow-lg transition-shadow duration-300 w-full sm:w-[300px] flex flex-col overflow-hidden">
      <Link to={`/listing/${listing._id}`}>
        <img src={`${listing.imageURLs[0]}`} alt="Listing Cover" className="h-[320px] sm:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-xl"/>
        <div className="p-3 flex flex-col gap-2 w-full">
          {/* added truncate to hide the long title */}
          <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
          <div className="flex items-center gap-1 ">
            <MdLocationOn className="text-green-700 h-4 w-4"/>
            <p className="truncate text-sm text-gray-600 w-full">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
        </div>  
      </Link>
      <p>{listing.listingType}</p>
    </div>
  );
}