import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"; // to dispatch the function
import {signInStart, signInSuccess, signInFailure, signInChange} from "../redux/user/userSlice.js"
import OAuth from "../components/OAuth.jsx";

function SignIn(){

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loadingEffect, setLoadingEffect] = useState(false);
  const {loadingEffect, error, currentUser} = useSelector((state) => state.user);
  // console.log(showErrorFlag);
  const navigate = useNavigate();

  const handleSignInChange = (e) => {
    // console.log(e.target.value);
    dispatch(signInChange());
    // dispatch(signInStart());

    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    }); //created new object for the new state.
    // console.log("printing loading effect and error");
    // console.log(loadingEffect, error);
  }
  // console.log(formData);
  const handleFormSubmit = async (e) =>{
    e.preventDefault();
    // setLoadingEffect(true);
   
    // fetch("https://fakestoreapi.com/products/1").then(res => res.json()).then(json => console.log(json));

    dispatch(signInStart());
    await axios.post("/api/auth/signin", JSON.stringify(formData), {headers:{
      "Content-type": "application/json"
    }})
    .then(res => {
      // setLoadingEffect(false);
      // setError(null);
      dispatch((signInSuccess(res.data)));

      //"signInSuccess(res.data)" inside the dispatch function is the action.

      // console.log(res.data); // just the data

      // console.log(res); // the entire axios response object

      navigate("/"); //authenticated users should be navigated to the homepage

    })
    .catch(err => {
      // setLoadingEffect(false);
      // if(err) {
        // setError(err.response.data.message);
        // console.log("I am in err of axios");
        // showErrorFlag =true;
        dispatch(signInFailure(err.response.data.message));
      // };
      if(!err.response.data.success){
        dispatch(signInFailure(err.response.data.message));
        // showErrorFlag = true;
      }
      console.log(err);
    });
  }

  return(
    <div className="max-w-lg mx-auto p-3">
      
      <h1 className="font-semibold text-3xl my-7 text-center">
        Sign In
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <div className="flex flex-col">

          <label>Email</label>
          <input type="email" placeholder="Ex. abc@gmail.com" className="p-3 rounded-lg border outline-slate-400" id="email" onChange=    {handleSignInChange}/>

        </div>

        <div className="flex flex-col">

          <label>Password</label>
          <input type="password" placeholder="****" className="p-3 rounded-lg border outline-slate-400" id="password" onChange={handleSignInChange}/>

        </div>
        <button disabled = {loadingEffect || error} className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 transition" >{loadingEffect? "Loading...": "SIGN IN"}</button>
        <OAuth/>
      </form>
      <div className="mt-4 flex gap-2">
        <h1>Don't have an account yet?</h1>
        <Link to={"/sign-up"} className="text-blue-700 hover:text-blue-500">Sign Up</Link>
      </div>
      {error? <p className="text-red-600 mt-3">{error}</p> : ""}
    </div>
  );
}

export default SignIn;