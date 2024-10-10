//C:\Restaurants\Restaurant\src\Components\Admin\Deshboard.jsx

import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mainbg">
      <div className="w-full max-w-4xl p-8 bg-secondary rounded-lg shadow-lg text-white">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-accent rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">Order Management</h2>
            <p>Manage orders from here.</p>
          </div>
          <div className="p-4 bg-accent rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">User Management</h2>
            <p>Manage users from here.</p>
          </div>
          <div className="p-4 bg-accent rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">User Management</h2>
          <Link to='/profile'>goto Profile Page</Link>
          </div>
          <div className="p-4 bg-accent rounded-lg shadow">
            <button className="text-2xl font-bold mb-2">User Management
          <Link to='/profile2'>goto Profile Page 2 </Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};
