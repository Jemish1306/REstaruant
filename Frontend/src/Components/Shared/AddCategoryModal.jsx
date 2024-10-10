import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddCategoryModal = ({ isVisible, onClose, onSave }) => {
  // Define initial state for category name and image
  const [formdata, setFormdata] = useState({
    categoryName: '',
    categoryImage: null
  });
  const [error, setError] = useState('');

  // Handle input change for category name
  const handleInputChange = (e) => {
    setFormdata({ ...formdata, categoryName: e.target.value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setFormdata({ ...formdata, categoryImage: e.target.files[0] }); // Get the first selected file
  };

  // Function to save category and image
  const handleSaveCategory = async () => {
    if (!formdata.categoryName || !formdata.categoryImage) {
      setError('Please provide both category name and image.');
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', formdata.categoryName);
    formData.append('image', formdata.imageFile);

    try {
      const response = await axios.post('http://localhost:3229/api/item/category', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onSave(response.data);  // Update parent component
      onClose();              // Close the modal
    } catch (error) {
      console.error('Error saving category:', error);
      setError('Failed to save the category. Please try again.');
    }
};


  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-mainbg bg-opacity-85">
      <div className="bg-accent p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Category</h2>

        {/* Error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Category name input */}
        <div className="mb-4">
          <label className="block text-white">Category Name</label>
          <input
            type="text"
            name="categoryName"
            className="w-full p-2 border rounded-lg bg-gray-700"
            value={formdata.categoryName}
            onChange={handleInputChange}
            placeholder="Enter category name"
          />
        </div>

        {/* File input for image */}
        <div className="mb-4">
          <label className="block text-white">Upload Category Image</label>
          <input
            type="file"
            
            className="w-full p-2 border rounded-lg bg-gray-700 border-dashed h-32"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end p-4 gap-4">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-500" onClick={onClose}>Cancel</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-500" onClick={handleSaveCategory}>Add</button>
        </div>
      </div>
    </div>
  );
};

AddCategoryModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddCategoryModal;
