import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"; // to dispatch the function
import {signInStart, signInSuccess, signInFailure, signInChange} from "../redux/user/userSlice.js"

function SignIn(){
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loadingEffect, setLoadingEffect] = useState(false);

  const {loadingEffect, error, currentUser} = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleSignInChange = (e) => {
    // console.log(e.target.value);
    dispatch(signInChange());
    // dispatch(signInStart());

    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    console.log("printing loading effect and error");
    console.log(loadingEffect, error);
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
      // if(!res.data){
      //   dispatch(signInFailure(res));
      // }
      dispatch((signInSuccess(res.data)));
      console.log(res.data);
      console.log(res);
      navigate("/about");

    })
    .catch(err => {
      // setLoadingEffect(false);
      // if(err) {
        // setError(err.response.data.message);
        console.log("I am in err of axios");
        dispatch(signInFailure(err.response.data.message));
      // };
      if(!err.response.data.success){
        dispatch(signInFailure(err.response.data.message));
      }
      console.log(error);
    });
    console.log(currentUser);
  }

  return(
    <div className="max-w-lg mx-auto p-3">
      
      <h1 className="font-semibold text-3xl my-7 text-center">
        Sign In
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <input type="email" placeholder="Email" className="p-3 rounded-lg border" id="email" onChange={handleSignInChange}/>
        <input type="password" placeholder="Password" className="p-3 rounded-lg border" id="password" onChange={handleSignInChange}/>
        <button disabled = {loadingEffect || error} className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 transition" >{loadingEffect? "Loading...": "SIGN IN"}</button>
      </form>
      <div className="mt-4 flex gap-2">
        <h1>Don't have an account yet?</h1>
        <Link to={"/sign-up"} className="text-blue-700 hover:text-blue-500 emp">Sign Up</Link>
      </div>
      {error? <p className="text-red-600 mt-3">{error}</p>:""}
    </div>
  );
}

export default SignIn;