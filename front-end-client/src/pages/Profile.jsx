import { useSelector } from "react-redux";
import {useRef} from "react";

function Profile(){

  const {currentUser} = useSelector(state => state.user);

  const fileRef = useRef(null); //using the "useRef" hook to provide reference of the image input to the profile picture so that
  //when a user clicks on the profile pic they're prompted to change the profile image

  console.log(currentUser);

  return(
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl my-8 text-center">Profile</h1>
      <input type="file" ref={fileRef} accept="image/*" hidden/> {/*Image file input kept hidden and "accept*" property ensuring only image files are accepted */}
      <form className="flex flex-col gap-4">
      <img onClick={()=> fileRef.current.click()} src= {currentUser.avatar} alt="profile-picture" className="h-24 object-cover w-24 rounded-full self-center hover:cursor-pointer"/>
      <input type="text" id="username" value={currentUser.username} className="border p-3 rounded-lg outline-slate-400"/>
      <input type="text" id="email" value={currentUser.email} className="border p-3 rounded-lg outline-slate-400"/>
      <input type="password" id="password" placeholder="Password" className="border p-3 rounded-lg outline-slate-400"/>
      <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-80 transition">Update Profile</button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 hover:cursor-pointer hover:opacity-80 transition">Delete Account</span>
        <span className="text-red-700 hover:cursor-pointer hover:opacity-80 transition">Sign Out</span>
      </div>

    </div>
  );

}

export default Profile;