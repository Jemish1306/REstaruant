//Restaurant/src/Model/EditItemModel.jsx


import React, { useState } from 'react';

const EditItemModel = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCancel = () => {
    setCategoryName('');
    setImage(null);
    // Add logic to close the modal if needed
  };

  const handleAdd = () => {
    console.log('Category Name:', categoryName);
    console.log('Image:', image);
    // Add logic to save the data and close the modal if needed
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">EditItem</h2>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Category Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            aria-label="Category Name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Upload Item Image</label>
          <input
            type="file"
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleImageChange}
            aria-label="Upload Item Image"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModel;
