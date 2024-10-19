import { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import menuicon from '../../assets/Img/icons8-menu-64.png';

const Layout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Close sidebar when clicking outside of it
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarVisible(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside of the sidebar
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Remove the event listener when the component is unmounted
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen bg-main">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`min-h-screen bg-dark transition-all duration-300 ease-in-out transform ${
          isSidebarVisible ? 'translate-x-0 '  : '-translate-x-full'
        } md:translate-x-0 md:block fixed md:relative z-10`}
        style={{ width: '250px' }} 
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Navbar with menu icon for mobile */}
        <Navbar />
        <div className="p-4 md:hidden absolute mt-32  ">
          <img
            src={menuicon}
            alt="Menu Icon"
            className="w-12 h-8 cursor-pointer absolute"
            onClick={toggleSidebar}
          />
        </div>

        {/* Main area */}
        <main className="flex-grow p-4 text-white bg-mainbg">
          {children}
        </main>
      </div>

      {/* Overlay for mobile view when sidebar is visible */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;
