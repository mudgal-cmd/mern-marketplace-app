function Header(){

  return (
    
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

      
        {/* text-sm is for mobile viewport and sm:text-xl is for the larger viewport */}
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
        {/* flex-wrap will wrap the 3 components of the header bringing them on top of each other */}
        <span className="text-slate-500">Urban</span>
        <span className="text-slate-700">UTOPIA</span>
      </h1>

      <form className="bg-slate-100 p-3 rounded-lg">
        <input type="text" placeholder="Search..." className="bg-transparent"/>
      </form>
    </div>
    </header>

  );
}

export default Header;