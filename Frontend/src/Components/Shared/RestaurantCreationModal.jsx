//Restaurant/src/Components/RestaurantCreationModal.jsx
import React, { useState } from 'react';

const RestaurantCreationModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    restaurantName: '',
    location: '',
    contact: '',
    cuisine: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      [name]: value,
    });
  };
 
// Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(restaurantData);
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-accent">
      <button onClick={() => setShowModal(true)} className="bg-yellow-500 text-white py-2 px-4 rounded-md">
        Create a new Restaurant
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-accent bg-opacity-70">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl mb-4 text-white">Create New Restaurant</h2>
            <form onSubmit={handleSubmit}>
              {['restaurantName', 'location', 'contact', 'cuisine'].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block mb-1 text-white" htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={restaurantData[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md text-gray-900"
                    required
                  />
                </div> 
              ))}
              <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-md">
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full mt-2 bg-gray-500 text-white py-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantCreationModal;
