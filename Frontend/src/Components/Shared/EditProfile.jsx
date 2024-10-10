const EditProfile = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-gray-400">First Name</label>
          <input type="text" className="p-2 bg-accent text-white rounded-xl focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400">Last Name</label>
          <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400">Email Address</label>
          <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400">Phone Number</label>
          <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400">Restaurant Name</label>
          <input type="text" className="p-2 w-full shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400">Gender</label>
          <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400">City</label>
          <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400">State</label>
          <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400">Country</label>
          <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
        <div className="flex flex-col md:col-span-2 lg:col-span-3">
          <label className="text-gray-400">Address</label>
          <textarea className="p-2 bg-accent shadow-xl text-white rounded-xl w-full focus:border-cyan-400 border-2 border-transparent focus:outline-none" />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-accent text-white py-2 px-4 rounded-lg bg-gradient-to-r to-blue-500 from-yellow-500  hover:bg-yellow-500 w-1/6 hover:from-yellow-500 hover:to-yellow-500 hover:text-black hover:font-semibold hover:text-xl">
          Save
        </button>
      </div>
    </div>
  );
  
  export default EditProfile;
  