import {Link} from "react-router-dom";

function SignUp(){
  return(
    <div className="p-3 max-w-lg mx-auto"> {/*mx-auto to bring the items in the center. max-w-lg to ensure the width of the field do not exceed the lg/large viewport*/}
      <h1 className="text-center my-7 font-semibold text-3xl">Sign Up</h1>

      <form className="flex flex-col gap-4"> {/* gap for the spacing between them*/}
        <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username" /> {/*"id" attribute to know which input is changing so that we can manipulate it*/}
        <input type="text" placeholder="Password" className="border p-3 rounded-lg" id="password"/>
        <input type="text" placeholder="Email" className="border p-3 rounded-lg" id="email"/>

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 transition disabled:opacity-80">Sign up</button>

      </form>

      <div className="flex gap-2 mt-5"> {/*mt- for the margin top*/}
        <p>Have an account? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>

    </div>
  );
}

export default SignUp;