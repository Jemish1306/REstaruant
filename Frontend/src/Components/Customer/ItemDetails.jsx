import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from './../Shared/Layout';

const ItemDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get passed item data from useLocation
  
  const { item, cartItems = [] } = state || {};
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1);
  const [customization, setCustomization] = useState({
    crust: '',
    size: '',
    toppings: []
  });

  if (!item) {
    return <p>No item data available. Please go back to the menu and select an item.</p>;
  }

  // Crust options for Step 1
  const crustOptions = [
    '100% Wheat Crust',
    'Cheese Burst',
    'Fresh Pan Pizza',
    'Classic Hand Tossed'
  ];

  // Size options for Step 2
  const sizeOptions = [
    { name: 'Medium' },
    { name: 'Large' },
    { name: 'Regular' }
  ];

  // Step 3: Ingredients - We assume the ingredients are already available in the item object
  const ingredients = item.ingredients ? item.ingredients.split(', ') : [];

  const handleCrustChange = (e) => {
    setCustomization({ ...customization, crust: e.target.value });
  };

  const handleSizeChange = (e) => {
    setCustomization({ ...customization, size: e.target.value });
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // const handleAddToCart = () => {
  //   const newItem = {
  //     itemId: item._id,
  //     itemName: item.itemName,
  //     itemPrice: item.itemPrice,
  //     itemImage: item.itemImage,
  //     customizations: { ...customization },
  //   };
  
  //   // Navigate to the Cart page and pass the newItem data as state
  //   navigate('/cart', { state: { cartItem: newItem } });
  // };
  

  const handleAddToCart = () => {
    
    // Add the selected item to the existing cart items
    const updatedCartItems = [...cartItems, item];
    navigate('/cart', { state: { cartItems: updatedCartItems } });
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-full md:max-w-4xl mx-auto bg-gray-800 rounded-md shadow-lg">
        
        {/* Item Details */}
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={item.itemImage && item.itemImage.startsWith('uploads/')
              ? `http://localhost:3229/${item.itemImage}` // Prepend server URL for 'uploads/' images
              : item.itemImage || '/uploads/placeholder.jpg'} // Use the HTTP URL, or fallback to a placeholder image
            alt={item.itemName || 'No Image Available'}
            className="w-full h-48 md:h-64 object-cover rounded-lg shadow-xl"
          />
          <div className="p-4">
            <h3 className="text-xl md:text-2xl text-white font-semibold">{item.itemName}</h3>
            <p className="text-sm md:text-base text-gray-400">{item.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-semibold text-white">₹{item.itemPrice}</span>
              <span className={`w-4 h-4 md:w-6 md:h-6 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </div>
          </div>
        </div>

        {/* Customization Steps */}
        <div className="mt-8 bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-white">Customize as per your taste</h3>
          <p className="text-gray-400 mb-4">Step {step}/3</p>

          {/* Step 1: Crust */}
          {step === 1 && crustOptions.length > 0 && (
            <div>
              <p className="text-gray-400">Crust</p>
              {crustOptions.map((crust, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-white">{crust}</span>
                  <input
                    type="radio"
                    name="crust"
                    value={crust}
                      
                    onChange={handleCrustChange}
                    className="accent-yellow-500" 
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Size */}
          {step === 2 && sizeOptions.length > 0 && (
            <div>
              <p className="text-gray-400">Size</p>
              {sizeOptions.map((size, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-white">{size.name}</span>
                  <input
                    type="radio"
                    name="size"
                    value={size.name}
                    onChange={handleSizeChange}
                    className="accent-yellow-500" 
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Ingredients */}
          {step === 3 && ingredients.length > 0 && (
            <div>
              <p className="text-gray-400">Ingredients</p>
              <ul className="text-white">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="py-1">{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button className="bg-gray-600 text-white py-2 px-4 rounded-md" onClick={handlePreviousStep}>
                Back
              </button>
            )}
            {step < 3 && (
              <button className="bg-gradient-to-r from-yellow-500 to-blue-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-md" onClick={handleNextStep}>
                Continue
              </button>
            )}
            {step === 3 && (
              <button className="bg-gradient-to-r from-yellow-500 to-blue-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-md" onClick={handleAddToCart}>
                Add To Cart
              </button>
            )}  
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetails;
