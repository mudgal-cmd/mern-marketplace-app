export const ShowListing = ({listing}) => {
  return (
    <div className="border border-slate-200 shadow-md h-80 rounded-xl mt-5 ml-5">
      <p>{listing.name}</p>
      <p>{listing.listingType}</p>
    </div>
  );
}