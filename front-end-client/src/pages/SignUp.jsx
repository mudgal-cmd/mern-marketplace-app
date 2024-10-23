import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import OAuth from "../components/OAuth";

import { logo } from "../assets";

// import { Provider } from "react-redux";

// import { useSelector } from "react-redux";

function SignUp(){

  const [formData, setFormData] = useState({}); // used the "useState" hook for recording/managing the sign-up from data.
  // const [previousState, setPreviousState] = useState({}); // for troubleshooting the states
  const [error, setError] = useState(null);
  const[loadingEffect, setLoadingEffect] = useState(null); //state use to manage the loading effect of the sign up button

  const navigate = useNavigate(); // to navigate the user to sign-in page in case of no errors.

  // const {currentUser} = useSelector((state) => state.user);

  const handleSignUpChange = (e) =>{
      setError(null);
      // setPreviousState(formData);
      setFormData({
        ...formData, // spreading the formData object to copy the data from the previous state obj to the new obj.
        [e.target.id] : e.target.value // updating just the required/modified/changed fields inside the formData. We're always recreating a new version of formData object.
      }); 
  }
  
  const handleSignUpSubmit= async (e) => {
    setLoadingEffect(true);
    e.preventDefault(); //to ensure page does not referesh on submitting the form.
    // console.log(formData);
    console.log("Submitted");
  
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, JSON.stringify(formData), {
      headers:{
        "Content-type": "application/json"
      }
    })
    .then(res => {
      setLoadingEffect(false);
      console.log(res);
      navigate("/sign-in");
    })
    .catch(err => {
      if(err.response.data.success === false)setError(err.response.data.message);
      console.log(err);
      setLoadingEffect(false);
    });
    
    // console.log(currentUser);

  }

  return(
    <div className="p-1 max-w-lg mx-auto relative "> {/*mx-auto to bring the items in the center. max-w-lg to ensure the width of the field do not exceed the lg/large viewport*/}
      <h1 className="text-center my-3 font-semibold text-2xl">Sign Up</h1>

      <div className="flex w-full items-center animate-float">
        <div className="rounded-xl bg-slate-200 bg-opacity-50 px-16 py-10 shadow-lg max-sm:px-8 w-full">
          <div className="mb-8 flex flex-col items-center">
            <img src={logo} width="150" alt="" srcset="" />
            <div className="text-xl sm:text-lg">
              <span className="text-slate-500">Urban</span>
              <span className="text-slate-700 font-bold">UTOPIA</span>
            </div>
          </div>

      <form className="flex flex-col gap-4" onSubmit={handleSignUpSubmit}> {/* gap for the spacing between them*/}
        <input type="text" placeholder="Username" className="border p-3 rounded-lg outline-slate-400" id="username" onChange={handleSignUpChange}/> {/*"id" attribute to know which input is changing so that we can manipulate it*/}
        <input type="password" placeholder="Password" className="border p-3 rounded-lg outline-slate-400" id="password" onChange={handleSignUpChange}/>
        <input type="email" placeholder="Email" className="border p-3 rounded-lg outline-slate-400" id="email" onChange={handleSignUpChange}/>

        <button disabled={loadingEffect || error} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-white hover:text-slate-700 hover:border hover:border-solid hover:border-slate-700 disabled:opacity-80">{loadingEffect? "Loading..." : "Sign Up"}</button>

        <OAuth className= "hover:border hover:border-red-700 hover:border-solid hover:text-red-700 hover:bg-white"/>

      </form>
      </div>
      </div>

      <div className="flex gap-2 mt-5 hover:animate-custom-bounce"> {/*custom-bounce is the custom css class created by extending the animation in tailwind.confi file to fix the issue with the bouncing animation where the element bounced really rigourously when hovered close to it.*/}
        <p>Already have an account? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 hover:text-blue-500">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignUp;