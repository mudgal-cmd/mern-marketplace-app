import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage, uploadBytesResumable, ref } from "firebase/storage";
import { app } from "../firebase.js";

function Profile(){

  const {currentUser} = useSelector(state => state.user);

  const [file, setFile] = useState(undefined);

  const fileRef = useRef(null); //using the "useRef" hook to provide reference of the image input to the profile picture so that
  //when a user clicks on the profile pic they're prompted to change the profile image

  console.log(currentUser);

  const getFile = (e) => {
    console.log(e.target.files[0]);
    // console.log(e.target.files[0].name);
    setFile(e.target.files[0]);
    console.log(file);
  } // function to get the name of the current profile picture.


  useEffect(()=>{

    if(file) {
      handleFileUpload(file);
    }

  }, [file]);

  const handleFileUpload =(file) => {

    const storage = getStorage(app); // initialized the mern firebase app/project, for the firebase to identify that it's the same app.
    console.log(storage);
    const fileName = new Date().getTime() + file.name; // to track each file modification and make a file name unique else error.
    console.log(typeof fileName);
    console.log(fileName);
    const storageRef = ref(storage, fileName);


    const uploadFileTask = uploadBytesResumable(storageRef, file);

    uploadFileTask.on('state_changed', 
      (snapshot) => {
        const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes)*100);

        console.log("Upload is ",progress,"done");
      }
    )

    console.log(storage);

    console.log(fileName);
  
  }


  return(
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl my-8 text-center">Profile</h1>
      <input type="file" onChange={(e) => getFile(e)} ref={fileRef} accept="image/*" hidden/> {/*Image file input kept hidden and "accept*" property ensuring only image files are accepted */}
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