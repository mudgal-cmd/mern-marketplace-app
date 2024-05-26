function SignIn(){
  return(
    <div className="max-w-lg mx-auto">
      
      <h1 className="font-semibold text-3xl my-7 text-center">
        Sign In
      </h1>

      <form className="flex flex-col gap-6">
        <input type="text" placeholder="Username" className="p-3 rounded-lg border"/>
        <input type="password" placeholder="Password" className="p-3 rounded-lg border"/>
        <button>Sign In</button>
      </form>

    </div>
  );
}

export default SignIn;