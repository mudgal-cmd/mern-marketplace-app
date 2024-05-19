function SignUp(){
  return(
    <div>
      <h1 className="text-center my-7 font-semibold text-3xl">Sign Up</h1>

      <form className="flex ">
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" /> {/*"id" attribute to know which input is changing so that we can manipulate it*/}
        <input type="text" placeholder="password" className="border p-3 rounded-lg" id="password"/>
        <input type="text" placeholder="email" className="border p-3 rounded-lg" id="email"/>
      </form>

    </div>
  );
}

export default SignUp;