import { useSelector } from "react-redux";


function Profile(){

  const {avatar} = useSelector(state => state.user.currentUser);

  console.log(avatar);

  return(
    <div>
      <h1 className="font-semibold text-3xl pt-8 text-center">Profile</h1>
      <form>
        <img src={avatar} alt="profile-picture"></img>
      </form>
    </div>
  );

}

export default Profile;