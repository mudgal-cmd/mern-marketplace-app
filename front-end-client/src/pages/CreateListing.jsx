const CreateListing = () => {
  return (
    <div class="bg-gradient-to-r from-white via-gray-100 to-gray-200 border border-gray-300 shadow-inner rounded-xl shadow-2xl p-8 max-w-sm mx-auto transform transition-transform duration-300 ease-in-out hover:scale-105">
    <h2 class="text-3xl font-semibold text-gray-800 mb-6">Welcome Back</h2>
    <form>
      <div class="mb-5">
        <label class="block text-gray-800 font-medium mb-2" for="email">Email</label>
        <input class="bg-gray-100 border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none" id="email" type="text"/>
      </div>
      <div class="mb-6">
        <label class="block text-gray-800 font-medium mb-2" for="password">Password</label>
        <input class="bg-gray-100 border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none" id="password" type="password"/>
      </div>
      <button class="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg w-full font-semibold">Login</button>
    </form>
  </div>
  )
}

export default CreateListing;