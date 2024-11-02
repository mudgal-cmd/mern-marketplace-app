import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"; // to dispatch the function
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signInChange,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
import { logo } from "../assets/index.js";

function SignIn() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loadingEffect, setLoadingEffect] = useState(false);
  const { loadingEffect, error, currentUser } = useSelector(
    (state) => state.user
  );
  // console.log(showErrorFlag);
  const navigate = useNavigate();

  const handleSignInChange = (e) => {
    // console.log(e.target.value);
    dispatch(signInChange());
    // dispatch(signInStart());

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    }); //created new object for the new state.
    // console.log("printing loading effect and error");
    // console.log(loadingEffect, error);
  };
  // console.log(formData);
  const handleFormSubmit = async(e) => {
    e.preventDefault();
    // setLoadingEffect(true);

    // fetch("https://fakestoreapi.com/products/1").then(res => res.json()).then(json => console.log(json));
    console.log(formData);
    dispatch(signInStart());
    // fetch("https://mern-marketplace-app-1.onrender.com/api/auth/signin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(formData)
    // }).then((res) => res.json()).then(data => {
    //   console.log(data);
    //   dispatch(signInSuccess(data));
    // })
    // .catch(error => console.log(error));



      await axios.post(`https://mern-marketplace-app-1.onrender.com/api/auth/signin`, JSON.stringify(formData), {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        // setLoadingEffect(false);
        // setError(null);
        dispatch(signInSuccess(res.data));

        console.log("LOG IN KAR LIA HAI");

        //"signInSuccess(res.data)" inside the dispatch function is the action.

        // console.log(res.data); // just the data

        // console.log(res); // the entire axios response object

        navigate("/"); //authenticated users should be navigated to the homepage
      })
      .catch((err) => {
        // setLoadingEffect(false);
        // if(err) {
        // setError(err.response.data.message);
        // console.log("I am in err of axios");
        // showErrorFlag =true;
        console.log(err);
        dispatch(signInFailure(err.response.data.message));
        // };
        if (!err.response.data.success) {
          dispatch(signInFailure(err.response.data.message));
          // showErrorFlag = true;
        }
        console.log(err);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-2 relative">
      <h1 className="font-semibold text-2xl my-5 text-center">Sign In</h1>
      <div className="flex w-full items-center animate-float">
        <div className="rounded-xl bg-slate-200 bg-opacity-50 px-16 py-10 shadow-lg max-sm:px-8 w-full">
          <div className="mb-8 flex flex-col items-center">
            <img src={logo} width="150" alt="" srcSet="" />
            <div className="text-xl sm:text-lg">
              <span className="text-slate-500">Urban</span>
              <span className="text-slate-700 font-bold">UTOPIA</span>
            </div>
          </div>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                placeholder="Ex. abc@gmail.com"
                className="p-3 rounded-lg border outline-slate-400"
                id="email"
                onChange={handleSignInChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                placeholder="****"
                className="p-3 rounded-lg border outline-slate-400"
                id="password"
                onChange={handleSignInChange}
              />
            </div>
            <button
              disabled={loadingEffect || error}
              className=" bg-slate-700 text-white p-3 rounded-lg border
              hover:bg-white hover:text-slate-700 hover:border-slate-700"
            >
              {loadingEffect ? "Loading..." : "SIGN IN"}
            </button>
            <OAuth />
          </form>
        </div>
      </div>
      <div className="mt-4 flex gap-2 hover:animate-custom-bounce"> {/*custom-bounce is the custom css class created by extending the animation in tailwind.confi file to fix the issue with the bouncing animation where the element bounced really rigourously when hovered close to it.*/}
        <h1>Don't have an account yet?</h1>
        <Link to={"/sign-up"} className="text-blue-700 hover:text-blue-500">
          Sign Up
        </Link>
      </div>
      {error ? <p className="text-red-600 mt-3">{error}</p> : ""}
    </div>
  );
}

export default SignIn;
