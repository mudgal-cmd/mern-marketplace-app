function OAuth(){

  const handleGoogleClick = () => {

    try{

    }
    catch(err) {
      console.log(err);
    }

  }

  return (
    <button type="button" onClick = {handleGoogleClick} className="bg-red-700 text-white hover:opacity-90 p-3 rounded-lg transition uppercase">
      Continue with Google
    </button>
  )

}

export default OAuth;