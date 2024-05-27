import { Link } from "react-router-dom";

function SignIn(){
  return(
    <div className="max-w-lg mx-auto">
      
      <h1 className="font-semibold text-3xl my-7 text-center">
        Sign In
      </h1>

      <form className="flex flex-col gap-6">
        <input type="text" placeholder="Username" className="p-3 rounded-lg border" id="username"/>
        <input type="password" placeholder="Password" className="p-3 rounded-lg border" id="password"/>
        <button className="bg-slate-700 text-white p-3 rounded-lg">SIGN IN</button>
      </form>
      <div className="mt-4 flex gap-2">
        <h1>Have an account?</h1>
        <Link to={"/sign-in"} className="text-blue-700">Sign In</Link>
      </div>
    </div>
  );
}

export default SignIn;