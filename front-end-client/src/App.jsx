import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";


function App() {
  return (
    
    <Router>
      <Header /> {/*header needs to be at every page*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route element = {<PrivateRoute />}>
          <Route path="/profile" element={<Profile/>} />
        </Route> */}
        <Route element={<PrivateRoute/>}>
          <Route path= "/profile" element={<Profile/>}></Route>
          <Route path="/create-listing" element = {<CreateListing />} /> 
          <Route path="/update-listing/:listingId" element= {<UpdateListing />}/>
        </Route>
          {/* Users can create a listing only when logged in */}
        <Route path="/listing/:listingId" element = {<Listing />} />
      </Routes>
    </Router>
  );
}

export default App;
