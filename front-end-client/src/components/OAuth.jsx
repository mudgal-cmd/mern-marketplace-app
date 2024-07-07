import {GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {app} from "../firebase.js";

function OAuth(){

  const handleGoogleClick = async () => {

    try{

      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      console.log(result);

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