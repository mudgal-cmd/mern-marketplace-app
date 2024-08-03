import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { app } from "../firebase.js";

function Profile(){

  const {currentUser} = useSelector(state => state.user);

  const [file, setFile] = useState(undefined); // state to store the uploaded file details

  const [fileUploadPerc , setFileUploadPerc] = useState(0); // state to store the file upload progress percentage

  const [updateFormData, setUpdateFormData] = useState({}); // state to manage the update profile form data

  const [fileUploadError, setFileUploadError] = useState(false);

  const fileRef = useRef(null); //using the "useRef" hook to provide reference of the image input to the profile picture so that
  //when a user clicks on the profile pic they're prompted to change the profile image

  // console.log(currentUser);

  console.log(updateFormData);
  console.log(fileUploadPerc);
  console.log(fileUploadError);

  const getFile = (e) => {
    // console.log(e.target.files[0]);
    // console.log(e.target.files[0].name);

    const targetFile = e.target.files[0];

    targetFile.type.startsWith("image")? setFile(targetFile): setFileUploadError("Incorrect image file format"); //allowing only image type files to upload/store in firebase

    // setFile(e.target.files[0]);
    console.log(file);// will get "undefined" because state update happens async because the state hasn't processed yet and we're already printing it.
  } // function to get the name of the current profile picture.


  useEffect(()=>{

    if(file) {
      handleFileUpload(file);
    }

  }, [file]);// we want to see the updated profile image, so useEffect will force a re-render everytime the value of file changes.

  console.log(file);

  const handleFileUpload =(file) => {

    const storage = getStorage(app); // initialized the mern firebase app/project, for the firebase to identify that it's the same app - optinal.
    // console.log(storage);
    const fileName = new Date().getTime() + file.name; // to track each file modification and make a file name unique else error.
    // console.log(typeof fileName);
    // console.log(fileName);
    const storageRef = ref(storage, fileName); //getting the reference of the firebase storage

    const uploadFileTask = uploadBytesResumable(storageRef, file);

    uploadFileTask.on('state_changed', //'state_changed' will track the changes and give us the snapshot. 3 observers / event handlers attached to the upload task.
    (snapshot) => { // tracking the changes of the image/versions uploaded
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);// computed the file upload percentage progress


        // console.log("Upload is ",progress,"%done");
        setFileUploadPerc(progress);
        // console.log(fileUploadPerc);
      }
    ,
    (error) => {setFileUploadError(error);},
    ()=>{
      getDownloadURL(uploadFileTask.snapshot.ref).then(
        (downloadURL)=> {
          setUpdateFormData({...updateFormData, avatar: downloadURL});
          console.log(downloadURL);

        } //downloadURL is the result of the getDownloadURL promise function getting resolved.
      );
    });
  
  }

  const handleFormData = (e)=>{
    console.log(e);
    // e.target.readOnly = true;
  }


  return(
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl my-8 text-center">Profile</h1>
      <input type="file" onChange={(e) => getFile(e)} ref={fileRef} accept="image/*" hidden/> {/*Image file input kept hidden and "accept*" property ensuring only image files are accepted */}
      <form className="flex flex-col gap-4">
      <img onClick={()=> fileRef.current.click()} src= {updateFormData.avatar || currentUser.avatar} alt="profile-picture" className="h-24 object-cover w-24 rounded-full self-center hover:cursor-pointer"/> {/* if the formdata has avatar, it will be shown else the image in db will be displayed*/}
      <p className="self-center text-sm">
        {
          fileUploadError? 
          <span className="text-red-700">
            {fileUploadError}
          </span> //display the error in case of any error during file upload
          : 
          fileUploadPerc>0 && fileUploadPerc<100? //if not any error, further check the file upload perc
          <span className="text-blue-700">{`Uploaded ${fileUploadPerc} %`}</span> // if fileUploadPerc is between 0 and 100, show it 
          : fileUploadPerc === 100?
          <span className="text-green-700">Image Uploaded Successfully</span> // display a text if the file uploaded completely
          :""
        }
      </p>
      <input type="text" id="username" value={currentUser.username} className="border p-3 rounded-lg outline-slate-400" onFocus={(e)=>handleFormData(e)}/>
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