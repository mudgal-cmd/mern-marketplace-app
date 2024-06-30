import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

// import { Provider } from "react-redux";

// import { useSelector } from "react-redux";

function SignUp(){

  const [formData, setFormData] = useState({}); // used the "useState" hook for recording/managing the sign-up from data.
  // const [previousState, setPreviousState] = useState({}); // for troubleshooting the states
  const [error, setError] = useState(null);
  const[loadingEffect, setLoadingEffect] = useState(null); //state use to manage the loading effect of the sign up button

  const navigate = useNavigate(); // to navigate the user to sign-in page in case of no errors.

  const {currentUser} = useSelector((state) => state.user);

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
  
    await axios.post("/api/auth/signup", JSON.stringify(formData), {
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
    
    console.log(currentUser);

  }

  return(
    <div className="p-3 max-w-lg mx-auto"> {/*mx-auto to bring the items in the center. max-w-lg to ensure the width of the field do not exceed the lg/large viewport*/}
      <h1 className="text-center my-7 font-semibold text-3xl">Sign Up</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSignUpSubmit}> {/* gap for the spacing between them*/}
        <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username" onChange={handleSignUpChange}/> {/*"id" attribute to know which input is changing so that we can manipulate it*/}
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleSignUpChange}/>
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email" onChange={handleSignUpChange}/>

        <button disabled={loadingEffect || error}className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 transition disabled:opacity-80">{loadingEffect? "Loading..." : "Sign Up"}</button>

      </form>

      <div className="flex gap-2 mt-5"> {/*mt- for the margin top*/}
        <p>Have an account? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 hover:text-blue-500">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignUp;