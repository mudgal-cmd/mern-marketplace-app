import { FaSearch } from "react-icons/fa"; //fa is for font awesome website.
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Routes, Route} from "react-router-dom";
import SignIn from "../pages/SignIn";
import {logo} from "../assets/index.js";
import { useState } from "react";
import axios from "axios";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const [searchData, setSearchData] = useState({});

  const [searchTerm, setSearchTerm] = useState(undefined);

  const getSearchTerm = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }
  
  const getSearchedListings = async () => {

    //handling the empty search term use case at the backend in api
    await axios.get(`/api/listing/search?searchTerm=${searchTerm}`, {headers:{"Content-Type":"application/json"}})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  // console.log(currentUser);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* text-sm is for mobile viewport and sm:text-xl is for the larger viewport */}

        <Link to={"/"}>
          {" "}
          {/* Advisable to wrap the elements inside the Link for the ease of SEO, styling, and adding event handlers*/}
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap justify-center items-center">
            {/* flex-wrap will wrap the 3 components of the header bringing them on top of each other */}
            <div className="w-16 h-10 object-contain mr-4 animate-bounce">
              <img src={logo} className="w-full h-full"/>
            </div>
            <span className="text-slate-500">Urban</span>
            <span className="text-slate-700">UTOPIA</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          {/* Removing the outline from the search bar and making it transparent, w-24 to set the width of 24rem to the bar */}
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64" onChange={(e)=>getSearchTerm(e)}
          />
          {/* for smaller viewport the search bar would be small and for the larger wones it would be bigger, i.e., w-64 */}
          <FaSearch className="text-slate-600" onClick={getSearchedListings}/>
        </form>

        <ul className="flex gap-4 ">
          {/*Menu*/}
          <Link to={"/"}>
            {/* Advisable to wrap the elements inside the Link for the ease of SEO, styling, and adding event handlers*/}
            <li className="hidden sm:inline hover:font-bold transition-opacity duration-150 cursor-pointer">
              Home
            </li>
          </Link>

          <Link to={"/about"}>
            {/* Advisable to wrap the elements inside the Link for the ease of SEO, styling, and adding event handlers*/}
            <li className="hidden sm:inline hover:font-bold transition-opacity duration-150 cursor-pointer">
              About
            </li>
          </Link>

          
            {/* Advisable to wrap the elements inside the Link for the ease of SEO, styling, and adding event handlers*/}

            <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile-picture"
                className="h-7 w-7 object-cover rounded-full"
              />
            ) : (
              <li className="hover:font-bold transition-opacity duration-150 cursor-pointer">
                Sign in
              </li>
            )}
            </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
