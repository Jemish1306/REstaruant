import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/Img/jemish.png'; // Make sure you have the correct path for the image

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/profile');
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-mainbg text-white shadow-md">
      {/* Heading Section */}
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h1 className="text-2xl md:text-4xl font-bold">Welcome Back 👋</h1>
        <p className="text-gray-400">Jds Restro</p>
      </div>

      {/* Search and Profile Section */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center bg-secondary rounded-xl p-2 w-full md:w-auto">
          {/* Search Icon */}
          <span className="text-xl text-gray-300 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search Here Your Delicious Food..."
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center ml-4">
          <span className="hidden md:block text-gray-300 mr-2">Musabbir Hossain</span>
          <img
            src={profileImg}
            alt="Profile"
            className="rounded-full w-8 h-8 ml-2 cursor-pointer"
            onClick={handleNavigate}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
