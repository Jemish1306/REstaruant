//Restaurant/src/Components/Shared/ChangePassword.jsx


const ChangePassword = () => (
    <div>
      {/* Add content for Change Password */}
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      <div className="flex flex-col m-8">
        <label className="text-gray-400 mb-2">Current Password</label>
        <input type="password" className="p-2 bg-accent h-14 text-white rounded-xl hover:border-cyan-400 w-1/2" />
      </div>
      <div className="flex flex-col m-8">
        <label className="text-gray-400 mb-2">New Password</label>
        <input type="password" className="p-2 bg-accent h-14  text-white rounded-xl hover:border-cyan-500 w-1/2" />
      </div>
      <div className="flex flex-col m-8">
        <label className="text-gray-400 mb-2">Confirm New Password</label>
        <input type="password" className="p-2 bg-accent h-14 text-white rounded-xl hover:border-cyan-400 w-1/2" />
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-gradient-to-r from-yellow-500 to-blue-500 font-semibold hover:bg-yellow-500 hover:to-yellow-500 hover:text-black hover:text-xl text-gray-900 py-2 px-4 h-16 rounded-lg ">Change Password</button>
      </div>
    </div>




  );
  
  export default ChangePassword;
  