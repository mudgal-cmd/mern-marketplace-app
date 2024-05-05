import { FaSearch } from "react-icons/fa"; //fa is for font awesome website.

function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* text-sm is for mobile viewport and sm:text-xl is for the larger viewport */}
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          {/* flex-wrap will wrap the 3 components of the header bringing them on top of each other */}
          <span className="text-slate-500">Urban</span>
          <span className="text-slate-700">UTOPIA</span>
        </h1>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          {/* Removing the outline from the search bar and making it transparent, w-24 to set the width of 24rem to the bar */}
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          {/* for smaller viewport the search bar would be small and for the larger wones it would be bigger, i.e., w-64 */}
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-4 ">
          {/*Menu*/}
          <li className="hidden sm:inline hover:font-bold transition-opacity duration-150">Home</li>
          <li>About</li>
          <li>Sign in</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
