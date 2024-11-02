import {GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {app} from "../firebase.js";
import {useDispatch} from "react-redux";
import {signInSuccess} from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

function OAuth(){

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {

    try{

      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const userData = await signInWithPopup(auth, provider); //userData contains the data of the user who signed using OAuth

      console.log(userData);

      const res = await fetch(`https://mern-marketplace-app-1.onrender.com/api/auth/google`, { //sending the OAuth user data to this endpoint to validate the user.

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },
        
        body: JSON.stringify({
          name: userData.user.displayName,
          email: userData.user.email,
          photoURL: userData.user.photoURL
        })
        
      });

      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));

      navigate("/about");
      
    }
    catch(err) {
      console.log(err);
    }

  }

  return (
    <button type="button" onClick = {handleGoogleClick} className="bg-red-700 text-white hover:border hover:border-red-700 hover:border-solid hover:text-red-700 hover:bg-white p-3 rounded-lg transition uppercase">
      Continue with Google
    </button>
  )

}

export default OAuth;