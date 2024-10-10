//Restaurant/src/Components/Shared/Profile.jsx
import { createContext, useContext, useState } from 'react';
import profileimg from '../../assets/Img/jemish.png'
import { ValueContext } from '../../Pages/ProfilePage';

const Profile = () => {
 
  const { setActiveSection } = useContext(ValueContext);

  return(
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4" >

          <img src={profileimg} alt="Profile" className="rounded-full w-16 h-16" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Jemish Mangukiay</span>
            <span className="text-gray-400">Statesman Restaurant</span>
          </div>
        </div>
        <button className="bg-accent text-white py-2 px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-400 hover:to-yellow-500 hover:text-black hover:" 
        onClick={() => setActiveSection('editprofile')}
       >Edit Profile</button>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       
      </div> */}
      
    </div>
 
  )
};
  
  export default Profile;
  