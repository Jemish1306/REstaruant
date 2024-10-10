import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Sidebar = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);  // State for toggling sidebar
  const [showOrders, setShowOrders] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  const togglePayment = () => {
    setShowPayment(!showPayment);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);  // Toggle sidebar visibility
  };

  return (
    <>
    
   

      {/* Sidebar */}
      <aside className={`bg-secondary p-6 w-64  h-full  top-0 left-0  `}>
        <div className="flex items-center space-x-2 mb-6">
          <img src="path/to/logo.png" alt="Logo" className="w-10 h-10" />
          <div className="text-2xl font-bold text-yellow-500">RESTAURANTS</div>
        </div>

        <nav>
          <ul>
            <li className="mb-8">
              <Link to="/profile" className="block py-2 px-4 text-gray-300 rounded-xl text-2xl hover:bg-mainbg hover:text-yellow-500">
                Dashboard
              </Link>
            </li>
            <li className="mb-8 relative">
              <button 
                className="block w-full text-left py-2 px-4 text-2xl text-gray-300 rounded-xl hover:bg-mainbg hover:text-yellow-500"
                onClick={toggleOrders}
              >
                Manage Order
              </button>
              {showOrders && (
                <ul className="ml-4 mt-2 bg-secondary">
                  <li className="mb-2">
                    <Link to="/parcel-order" className="block py-2 px-4 text-gray-300 text-xl rounded-xl hover:bg-mainbg hover:text-yellow-500">
                      Parcel Order
                    </Link>
                  </li>
                  <li>
                    <Link to="/onsite-order" className="block py-2 px-4 text-gray-300 text-xl rounded-xl hover:bg-mainbg hover:text-yellow-500">
                      Onsite Order
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-8">
              <Link to="/menupage" className="block py-2 px-4 text-gray-300 text-2xl rounded-xl hover:bg-mainbg hover:text-yellow-500">
                Manage Menu
              </Link>
            </li>
            <li className="mb-8 relative">
              <button 
                className="block w-full text-left py-2 px-4 text-2xl text-gray-300 rounded-xl hover:bg-mainbg hover:text-yellow-500"
                onClick={togglePayment}
              >
                Manage Payment
              </button>
              {showPayment && (
                <ul className="ml-4 mt-2 bg-secondary">
                  <li className="mb-2">
                    <Link to="/percalPayment" className="block py-2 px-4 text-gray-300 text-xl rounded-xl hover:bg-mainbg hover:text-yellow-500">
                      Parcel Payment
                    </Link>
                  </li>
                  <li>
                    <Link to="/onsitepayment" className="block py-2 px-4 text-gray-300 text-xl rounded-xl hover:bg-mainbg hover:text-yellow-500">
                      Onsite Payment
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-8">
              <Link to="/barcode" className="block py-2 px-4 text-gray-300 text-2xl rounded-xl hover:bg-mainbg hover:text-yellow-500">
                QR Codes
              </Link>
            </li>
          </ul>
        </nav>
        
        <div>
          <button 
            className="bg-red-600 text-white w-full py-2 rounded mt-4 hover:bg-red-700"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {showSidebar && (
        <div 
          className="fixed bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
