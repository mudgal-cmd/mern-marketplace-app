import { useSelector, useDispatch } from "react-redux";


const CreateListing = () => {

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold my-3 text-center">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex gap-4 flex-col flex-1">
          <input type="text" placeholder="name" name="name" className="border p-3 rounded-lg" id="name" maxLength="62" minLength="5" required/>
          <textarea type="text" placeholder="Description" name="description" id="description" className="border p-3 rounded-lg" required />
          <input type="text" placeholder="address" name="address" id="address" className="border p-3 rounded-lg" required/>

          <div className="flex gap-5">
            <div className="flex gap-2">
            
              <input type="checkbox" id="sell" name="sell" className="w-5"/>
              <span>Sell</span>

            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" name="rent" className="w-5"/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" name="parking" className="w-5"/>
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" name="furnished" className="w-5"/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" name="offer" className="w-5"/>
              <span>Offer</span>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}

export default CreateListing;