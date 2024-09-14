import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const ContactLandLord = ({listing}) => {

  const [landlordData, setLandlordData] = useState({});

  const [landlordMessage, setLandLordMessage] = useState("");

  useEffect(()=> {
    (async function(){
      try{

        const response = await axios.get(`/api/user/get-user/${listing.createdBy}`);
        console.log(response);
        setLandlordData(response.data);
      }
      catch(error){
        console.log(error);
      }


    })();
  }, []);

  const handleMessageToLandlord = (e) => {
    setLandLordMessage(e.target.value);
  }

  return (
    <div>
      {landlordData && (
        <div className="flex flex-col gap-2">
          <p>Contact <span className="font-semibold">{landlordData.username}</span> for <span className="font-semibold">{listing.name.toLowerCase()}</span></p>
          <textarea name="message" id="message" rows={2} value={landlordMessage} placeholder="Say Hello..." onChange={handleMessageToLandlord}className="w-full border p-3 rounded-lg"></textarea>
          <Link to={`mailto:${landlordData.email}?subject=Query%20regarding%20${encodeURIComponent(listing.name)}&body=${encodeURIComponent(landlordMessage)}`} className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:bg-white hover:text-slate-700 border hover:border-slate-700 transition">Send Message</Link>
        </div>
      )}  
    </div>
  );
}

export default ContactLandLord;