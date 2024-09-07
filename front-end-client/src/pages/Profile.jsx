import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { app } from "../firebase.js";
import axios from "axios";
import {
  updateUserStart, updateUserSuccess, updateUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signOutStart, signOutSuccess, signOutFailure
} from "../redux/user/userSlice.js";
import { cameraLogo } from "../assets/index.js";
import {Link} from "react-router-dom";

function Profile(){

  const dispatch = useDispatch();

  const {currentUser, loadingEffect, error} = useSelector(state => state.user);

  const [file, setFile] = useState(undefined); // state to store the uploaded file details

  const [fileUploadPerc , setFileUploadPerc] = useState(0); // state to store the file upload progress percentage

  const [updateFormData, setUpdateFormData] = useState({}); // state to manage the update profile form data

  const [fileUploadError, setFileUploadError] = useState(false);

  const [userListings, setUserListings] = useState([]);

  const fileRef = useRef(null); //using the "useRef" hook to provide reference of the image input to the profile picture so that
  //when a user clicks on the profile pic they're prompted to change the profile image

  const getFile = (e) => {

    const targetFile = e.target.files[0]; //get the uploaded file.

    targetFile.type.startsWith("image")? setFile(targetFile): setFileUploadError("Incorrect image file format"); //allowing only image type files to upload/store in firebase

    // setFile(e.target.files[0]);
    console.log(file);// will get "undefined" because state update happens async because the state hasn't processed yet and we're already printing it.
  } // function to get the name of the current profile picture.


  useEffect(()=>{

    if(file) {
      handleFileUpload(file);
    }

  }, [file]);// we want to see the updated profile image, so useEffect will force a re-render everytime the value of file changes.


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


        console.log("Upload is ",progress,"%done");
        setFileUploadPerc(progress);
        // console.log(fileUploadPerc);
      }
    ,
    (error) => {setFileUploadError(error); console.log(error)},
    ()=>{
      getDownloadURL(uploadFileTask.snapshot.ref).then(
        (downloadURL)=> {

          setUpdateFormData({...updateFormData, avatar: downloadURL});

          // console.log(downloadURL);
          
        } //downloadURL is the result of the getDownloadURL promise function getting resolved.
      );
    });
  
  }

  const handleImageRef = () => {
    fileRef.current.click();
  } // this handler is particularly created to reuse the useRef hook to allow user to change the profile pic by clicking on either the profile image or the camera icon.

  const handleFormDataChange = (e)=>{
    // console.log(updateFormData);

    setUpdateFormData({...updateFormData, [e.target.name]: e.target.value});

  }

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());// ?? why is it showing the query params in the URL - reason being  "specified before disabling the default form submit behavior."
    console.log(updateFormData);
    await axios.put(`/api/user/updateUser/${currentUser._id}`, JSON.stringify(updateFormData), {headers:{
      "Content-Type" : "application/json"
    }}).then(res => {
      console.log(res.data.userData);
      dispatch(updateUserSuccess(res.data.userData));

    }).catch(err => {
      console.log(err);
      dispatch(updateUserFailure(err.response.data.message));
    }); 

  }

  const handleDeleteUser = async() => {

    dispatch(deleteUserStart());
    // dispatch(delete)
    await axios.delete(`/api/user/deleteUser/${currentUser._id}`).
    
    then(res => {
      console.log(res);
      dispatch(deleteUserSuccess(res.data.message)); // deleting an account will directly navigate the user to sign-in page due to the private route component.

    }).
    catch(error => {
      console.log(error);
      dispatch(deleteUserFailure(error.response.data.message));
    })


  }

  const handleUserSignOut = () => {
    dispatch(signOutStart());
  
      axios.post(`/api/auth/signout/${currentUser._id}`).
      then(res => {
        console.log(res);
        if(res.data.success === false) return error(res);
        dispatch(signOutSuccess());
      })
      .catch(error => {
        dispatch(signOutFailure(error.response.data.message)); // to show error at the bottom of the page.
      });

    
  }


  const handleShowListings = async() => {
    try {
      await axios.get(`/api/user/listings/${currentUser._id}`).
        then(res => {
          console.log(res.data);
          setUserListings(res.data.listings);
        }).
        catch(err => console.log(err.response.data.message));
    } catch (error) {
      console.log(error);
    }
  }


  return(
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl my-8 text-center">Profile</h1>
      <input type="file" onChange={(e) => getFile(e)} ref={fileRef} accept="image/*" hidden/> {/*Image file input kept hidden and "accept*" property ensuring only image files are accepted */}
      <form className="flex flex-col gap-4"  onSubmit={handleUpdateFormSubmit}>
        <div className="self-center w-24 h-24 flex justify-center items-center group">
          <img onClick={handleImageRef} src= {updateFormData.avatar || currentUser.avatar} alt="profile-picture" className=" object-cover h-24 w-24 rounded-full self-center hover:opacity-40 hover:cur"/> {/* if the formdata has avatar, it will be shown else the image in db will be displayed*/}
          <img src={cameraLogo} onClick={handleImageRef} className="absolute  opacity-0 transition-opacity w-12 h-12 duration-300 hover:cursor-pointer group-hover:opacity-50"/>
        </div>
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
        <input type="text" name="username" id="username" defaultValue={currentUser.username} className="border p-3 rounded-lg outline-slate-400" onChange={handleFormDataChange} required/>
        <input type="text" name="email" id="email" defaultValue={currentUser.email} className="border p-3 rounded-lg outline-slate-400" onChange={handleFormDataChange} required/>
        {/* <input type="password" name="password" id="password" placeholder="Password" className="border p-3 rounded-lg outline-slate-400" onChange={handleFormDataChange}/> */}
      {loadingEffect? <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-80 transition uppercase">Loading
        <div className="inline-block">...</div>
      </button> : <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-80 uppercase border hover:text-slate-700 hover:border-slate-700 hover:bg-white transition hover:shadow-lg">Update Profile</button>}
      <Link to={"/create-listing"} className="bg-green-700 text-white p-3 rounded-lg hover:bg-white hover:text-green-700 border hover:border-green-700 uppercase text-center transition hover:shadow-lg">Create Listing</Link>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 hover:cursor-pointer hover:opacity-80 transition hover:animate-custom-bounce" onClick={handleDeleteUser}>Delete Account</span>
        <span className="text-red-700 hover:cursor-pointer hover:opacity-80 transition hover:animate-custom-bounce" onClick={handleUserSignOut}>Sign Out</span>
      </div>
      <button className="text-green-700 w-full mt-5" onClick={handleShowListings}>Show Listings</button>
      {error? <p className="text-red-600 mt-3">{error}</p> : ""}
        

        {userListings && userListings.length>0 && 
        <div className="gap-4 flex flex-col">
          <h1 className="text-2xl font-semibold text-center mt-7">Your Listings</h1>
          {userListings.map(listing => (
          <div key={listing._id} className="border flex items-center justify-between rounded-lg p-3 gap-4">
            <Link to={`listings/${listing._id}`}>
              <img src={listing.imageURLs[0]} alt="listing cover" className="h-16 w-16 object-contain"/>
            </Link>
            <Link className="text-slate-700 font-semibold flex-1 hover:underline truncate" to={`/listings/${listing._id}`}>
              <p>{listing.name}</p>
            </Link>
            <div className="flex flex-col">
              <button className="text-red-700 uppercase">Delete</button>
              <button className="text-green-700 uppercase">Edit</button>
            </div>
          </div>
        ))}
        </div>}

    </div>
  );

}

export default Profile;