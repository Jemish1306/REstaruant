// src/Components/Admin/ProfilePage.jsx

{/* import Layout from './../Shared/Layout';

const ProfilePage = () => {
  return (
    <Layout>
    <section className="p-8 bg-mainbg rounded-lg text-white">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="bg-secondary shadow-2xl p-6 rounded-lg w-full lg:w-1/4 h-1/2 lg:h-full">
          <div className="text-yellow-500 text-lg font-semibold mb-4">Menu</div>
          <ul className="space-y-4">
            <li>
              <button className="py-2 px-4 bg-accent shadow-lg text-white font-semibold rounded-md w-full text-left hover:bg-yellow-500">Profile</button>
            </li>
            <li>
              <button className="py-2 px-4 bg-accent shadow-lg text-white font-semibold rounded-md w-full text-left hover:bg-yellow-500">Change Password</button>
            </li>
            <li>
              <button className="py-2 px-4 bg-accent shadow-lg text-white font-semibold rounded-md w-full text-left hover:bg-yellow-500">Terms & Condition</button>
            </li>
          </ul>
        </div>
        <div className="bg-secondary shadow-2xl p-6 rounded-lg w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4"> 
            <div className="flex items-center space-x-4">
              <img src="path/to/profile-image.jpg" alt="Profile" className="rounded-full w-16 h-16" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Jenny Wilson</span>
                <span className="text-gray-400">Statesman Restaurant</span>
              </div>
            </div>
            <button className="bg-accent text-white  py-2 px-4 rounded-lg hover:bg-yellow-500">Edit Profile</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-400">First Name</label>
              <input type="text" className="p-2 bg-accent text-white rounded-xl focus:border-cyan-400" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">Last Name</label>
              <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">Email Address</label>
              <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">Phone Number</label>
              <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">Restaurant Name</label>
              <input type="text" className="p-2 w-full shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">Gender</label>
              <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">City</label>
              <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">State</label>
              <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">Country</label>
              <input type="text" className="p-2 shadow-lg bg-accent text-white rounded-xl focus:border-cyan-400" />
            </div>
            <div className="flex flex-col md:col-span-2 lg:col-span-3">
              <label className="text-gray-400">Address</label>
              <textarea className="p-2 bg-accent shadow-xl text-white rounded-xl w-full focus:border-cyan-400" />
            </div>
          </div>
     
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default ProfilePage;  */}






import { createContext, useState } from 'react';
import Layout from '../Components/Shared/Layout';

import TermsAndConditions from '../Components/Shared/TermAndConditions';
import ChangePassword from '../Components/Shared/ChangePassword';
import EditProfile from '../Components/Shared/EditProfile';

import Profile from '../Components/Shared/Profile';


export const ValueContext = createContext();

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');


  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'changePassword':
        return <ChangePassword />;
      case 'termsAndConditions':
        return <TermsAndConditions />;
      case 'editprofile':
        return <EditProfile />;
      default:
        return <Profile/>;
    }
  };

  return (
    <ValueContext.Provider value={{activeSection,setActiveSection}}>

    
    
      <Layout>
        <section className="p-8 bg-mainbg rounded-lg text-white">
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="bg-secondary shadow-2xl p-6 rounded-lg w-full lg:w-1/4 h-1/2 lg:h-full">
              <div className="text-yellow-500 text-lg font-semibold mb-4">Menu</div>
              <ul className="space-y-4">
                <li>
                  <button
                    className={`py-2 px-4 bg-accent h-20 shadow-lg hover:text-black hover:font-semibold hover:text-xl text-white font-semibold rounded-md w-full text-left hover:bg-yellow-500 ${
                      activeSection === 'profile' ? 'bg-yellow-500 text-xl font-bold' : ''
                    }`}
                    onClick={() => setActiveSection('profile')}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 bg-accent shadow-lg h-20 text-white  hover:text-black hover:font-semibold hover:text-xl font-semibold rounded-md w-full text-left hover:bg-yellow-500 ${
                      activeSection === 'changePassword' ? 'bg-yellow-500 text-xl font-bold   ' : ''
                    }`}
                    onClick={() => setActiveSection('changePassword')}
                  >
                    Change Password
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 bg-accent shadow-lg text-white h-20  hover:text-black hover:font-semibold hover:text-xl font-semibold rounded-md w-full text-left hover:bg-yellow-500 ${
                      activeSection === 'termsAndConditions' ? 'bg-yellow-500 text-xl font-bold' : ''
                    }`}
                    onClick={() => setActiveSection('termsAndConditions')}
                  >
                    Terms & Condition
                  </button>
                </li>
              </ul>
            </div>
            <div className="bg-secondary shadow-2xl p-6 rounded-lg w-full lg:w-3/4">
              {renderSection()}
            </div>
          </div>
        </section>
      </Layout>
      </ValueContext.Provider>
  
  );
};

export default ProfilePage;
