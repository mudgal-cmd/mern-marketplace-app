import {useSelector} from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(){ //component to restricts the access to the profile page if a user is not signed in / authenticated.

  const {currentUser} = useSelector(state => state.user);

  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />

}

export default PrivateRoute;